import { useState } from "react";

export const useRegister = ()=>{
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const [sucess, setSucess] = useState(null)


  const register = async (name,email, password)=>{
    setIsLoading(true)
    setError(null)

    const baseUrl = "https://form-builder-api-node.vercel.app"

    const response = await fetch(`${baseUrl}/api/users/register`, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name,email, password})
    })

    const json = await response.json()

    if(!response.ok){
      setIsLoading(false)
      setError(json.msg)
    }

    if(response.ok){
      setSucess("Plaese check your email to verify your Accout")

      setIsLoading(false)
    }
    
  }
  return { register, isLoading,sucess, error}
}