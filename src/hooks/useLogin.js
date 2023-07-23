import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useLogin = ()=>{
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const [verify, setVerify] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password)=>{
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({email, password})
    })

    const json = await response.json()

    if(!response.ok){
      setIsLoading(false)
      if(json.msg === "Please verify your email, Check your inbox"){
        setVerify(true)
      }
      setError(json.msg)
    }

    if(response.ok){
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type : 'LOGIN', payload: json})

      setIsLoading(false)
    }
    
  }
  return { login, isLoading, error, verify}
}