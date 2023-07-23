import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import EmailVerification from './pages/EmailVerification'
import { useAuthContext } from './hooks/useAuthContext'
import FormBuilder from './pages/FormBuilder'

function App() {
  const { user } = useAuthContext()

  return (
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home/> : <Navigate to="/login" />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path='/verify' element={!user ? <EmailVerification /> : <Navigate to="/"/>} />
          <Route path='/form-builder/:id' element={user ? <FormBuilder /> : <Navigate to="/" />} />
        </Routes>
      </Router>
  )
}

export default App
