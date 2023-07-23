import {Link} from 'react-router-dom'
import { useState } from 'react'
import { useVerifyEmail } from '../hooks/useVerifyEmail'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const EmailVerification = ()=>{
  const [pin, setPin] = useState("")
  const [email, setEmail] = useState("")
  const {verify, isLoading, sucess, error} = useVerifyEmail()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    await verify(email,pin)
  }

  return(
    <div>
      <Navbar />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Please verify Your Email
                  </h1>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                            </div>

                      <div>
                          <label htmlFor="pin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter OTP</label>
                          <input type="text" name="pin" id="pin" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="****" required=""
                          value={pin}
                          onChange={(e)=> setPin(e.target.value)} />
                      </div>
                      
                      <button type="submit" disabled={isLoading} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Confirm Email</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
                      </p>

                      {error && <p className='border border-red-700 px-8 py-2 text-center text-red-700'>{error}</p>}
                      {sucess && <p className='border border-green-700 px-8 py-2 text-center text-green-700'>
                        {sucess} <Link to="/login" className='text-primary-800 font-bold'>
                          login here
                                </Link>
                        </p>}
                  </form>
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default EmailVerification