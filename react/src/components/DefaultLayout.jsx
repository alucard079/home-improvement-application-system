import { Navigate, Outlet, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {name, token, setUser, setName, setToken} = useStateContext();

    if(!token) {
        return <Navigate to="/login"/>
    }

    const onLogout = (e) => {
        e.preventDefault();
        axiosClient.post('/logout')
        .then(() => {
            setUser({});
            setName(null);
            setToken(null);
        })
    }
    
    return (
        <div id="defaultLayout">
            <aside className="sidebar">
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/improvement-applications">Improvement Applications</Link>
            </aside>
            <div className="content">
                <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 light:bg-white">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <img src="src/assets/logo.png" className="h-20" alt="logo"/>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
                                <li>
                                    <button onClick={onLogout} className="block py-2 pl-3 pr-4 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white" aria-current="page">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <main>
                    <Outlet/>
                </main> 
            </div>
        </div>
      )
}
