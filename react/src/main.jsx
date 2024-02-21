import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import { ContextProvider } from './contexts/ContextProvider'
import './index.css'
import router from './router.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'flowbite-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer 
      position="bottom-right"
    />
    <ContextProvider>
      {/* <App /> */}
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>,
)
