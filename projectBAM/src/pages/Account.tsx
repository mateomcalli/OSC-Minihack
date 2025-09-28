import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Account = () => {
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth`, { withCredentials: true })
      } catch (error) { 
        console.error(error)
        window.location.href = '/login'
      }
    }
    checkAuth()
  }, [])
  
  return (
    <div>
      <div className='relative z-1 flex flex-col pt-10 px-4'>
        <div className="flex justify-center">
        <Link to='/home'><img src="logo.png" className="w-[64px] h-[70px] mb-10 drop-shadow-md/50"/></Link>
      </div>
      <h1 className="text-3xl mb-5 flex justify-center">Account Details:</h1>
      <div className="bg-white shadow rounded-2xl p-4 space-y-4">


      </div>
    </div>
  </div>
  )
}

export default Account