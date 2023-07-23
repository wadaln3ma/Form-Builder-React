import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'
import { FormContextProvider } from './context/FormContext.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <FormContextProvider>
      <App />
      <ToastContainer />
    </FormContextProvider>
  </AuthContextProvider>,
)
