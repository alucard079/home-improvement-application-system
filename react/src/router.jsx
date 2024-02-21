import {createBrowserRouter, Router} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuessLayout from "./components/GuessLayout";
import Dashboard from "./pages/Dashboard";
import ImprovementApplications from "./pages/improvement_applications/Index";
import ImprovementApplicationForm from "./pages/improvement_applications/ImprovementApplicationForm";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/improvement-applications"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/improvement-applications',
                element: <ImprovementApplications/>
            },
            {
                path: '/improvement-applications/create',
                element: <ImprovementApplicationForm key="improvementApplicationCreate"/>
            },
            {
                path: '/improvement-applications/:id/edit',
                element: <ImprovementApplicationForm key="improvementApplicationUpdate"/>
            },
        ]
    },
    {
        path: '/',
        element: <GuessLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
])

export default router;