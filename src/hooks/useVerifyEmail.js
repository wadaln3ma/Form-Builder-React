import { useState } from "react";

export const useVerifyEmail = ()=>{
  const [isLoading, setIsLoading] = useState(null)
  const [error, setError] = useState(null)
  const [sucess, setSucess] = useState(null)

  const verify = async (email, otp)=>{
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:5000/api/auth/otp/verifyMail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email, otp})
    })

    const json = await response.json()
    console.log(json)

    if(!response.ok){
      setIsLoading(false)
      setError(json.msg)
    }

    if(response.ok){
      setSucess("Thank you, Your Eamil have been verified, You Can login Now")
      setIsLoading(false)
    }
    
  }
  return { verify, isLoading,sucess, error}
}