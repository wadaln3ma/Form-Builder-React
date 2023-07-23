import {Link} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = (e)=>{
    e.preventDefault()

    logout()
  }

  return (
    <div className="w-full flex align-center justify-between bg-gray-50 px-2 sm:px-8 py-4 shadow-xl">
      <Link to="/"><h1 className="font-bold text-xl"><span className="text-blue-500">Form</span><span className="text-red-500">Builder</span></h1></Link>
      <nav>
        {user ? 
        <div className='flex gap-2'>
          <h3 className='hidden sm:flex font-bold text-gray-700'>{user.name.split(' ')[0]}</h3>
          <button 
          className='border bg-red-600 text-white font-bold py-1 px-4 rounded-md hover:bg-white hover:text-red-700 hover:border-red-700 duration-300' 
          onClick={handleClick}>
            Logout
            </button>  
        </div>
         :
        <div className="flex gap-4">
        <Link to="/login" className="font-bold cursor-pointer">login</Link>
        <Link to="/register" className="font-bold cursor-pointer">Register</Link>
      </div>
        }
      </nav>
    </div>
  )
}

export default Navbar