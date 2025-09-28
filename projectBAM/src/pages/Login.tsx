import { useRef, useState } from "react"
import Footer from "../components/Footer"
import axios from 'axios'

interface LoginData {
  email: string
  password: string
}

const Login = () => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
    console.log(loginData)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await axios.post(
        'http://localhost:3000/api/login',
        loginData,
        { withCredentials: true }
      )
      window.location.href = '/home'
    } catch (error) {
      console.error(error)
    }
    if (formRef.current) {
      formRef.current.reset()
    }
  }

  return (
    <>
      <div className="relative z-1 flex flex-col pt-16 px-4">
        <div className="flex flex-col">
          <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
          <h1 className="font-default text-gray-500 text-4xl">Log In</h1>
        </div>
        <div className="mt-7" id="spacer-for-input-fields">
          <form method="post" onSubmit={handleSubmit} ref={formRef}>
            <input
              onChange={handleChange}
              type="email"
              name='email'
              placeholder="E-mail Address"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <input
              onChange={handleChange}
              type="password"
              name='password'
              placeholder="Password"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button 
              type="submit" 
              className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium hover:cursor-pointer"
            >
              Log in
            </button>
          </form>
        </div>
      </div>
      <Footer blurb="Don't have an account yet?" linkText="Sign up" linkPath="/"/>
    </>
  )
}

export default Login