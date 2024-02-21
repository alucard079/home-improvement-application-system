import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Card from "./Card";

export default function GuessLayout() {
  const {token} = useStateContext();

  if(token) {
    return <Navigate to="/dashboard"/>
  }
  return (
    <div className="center-form">
      <Card>
        <Outlet/>
      </Card>
    </div>
  )
}
