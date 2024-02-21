import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [name, _setName] = useState(localStorage.getItem('NAME'));
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if(token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }

    const setName = (name) => {
        _setName(name);
        if(name) {
            localStorage.setItem('NAME', name);
        } else {
            localStorage.removeItem('NAME');
        }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            name,
            setUser,
            setToken,
            setName
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);