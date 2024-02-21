import { useRef, useState } from "react"
import axiosClient from "../axios-client";
import Button from "../components/Button";
import InputText from "../components/InputText";
import {useStateContext} from "../contexts/ContextProvider";

export default function Login() {

  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken, setName} = useStateContext();
  const [loading, setLoading] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post('/login', payload)
    .then(({data}) => {
      setLoading(false);
      setUser(data.user);
      setName(data.user.name);
      setToken(data.token);
    })
    .catch(err => {
      setLoading(false);
      const response = err.response;
      if(response && response.status === 422) {
        if(response.data.errors) {
          setErrors(response.data.errors)
        } else {
          setErrors({
            email: [response.data.message]
          })
        }
      }
    })
  }
  return (
    <>
      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="flex justify-center">
          <img src="src/assets/logo.png" className="h-28" alt="logo"/>
        </div>
        <h5 className="text-xl font-medium text-gray-900 light:text-black">Sign in to our platform</h5>
        <div>
          <InputText 
              type="email" 
              value={emailRef} 
              label="Email" 
              placeholder="name@gmail.com" 
              className={`${errors && errors.email ? "w-full border-red-400" : "w-full"}`}
          />
          {errors && errors.email ? <span className="text-red-600">{errors['email'][0]}</span> : ""}
        </div>
        <div>
          <InputText 
            type="password" 
            value={passwordRef} 
            label="Password" 
            placeholder="••••••••" 
            className={`${errors && errors.password ? "w-full border-red-400" : "w-full"}`}
          />
          {errors && errors.password ? <span className="text-red-600">{errors['password'][0]}</span> : ""}
        </div>
        <Button type="submit" color="teal" value="Login to your account" loading={loading} className="w-full"/>
      </form>
    </>
  )
}
