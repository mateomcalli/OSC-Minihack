import { Link } from "react-router-dom"
import { useState } from "react"
import Footer from "../components/Footer"

interface LoginData {
  email: string
  password: string
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
    console.log(loginData)
  }

  return (
    <>
      <div className="relative z-1 flex flex-col">
        <div className="flex flex-col">
          <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
          <h1 className="font-default text-gray-500 text-4xl">Log In</h1>
        </div>
        <div className="mt-7" id="spacer-for-input-fields">
          <input
            onChange={handleChange}
            type="email"
            name="email"
            placeholder="E-mail Address"
            className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <input
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <Link to='/home' className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
            Log in
          </Link>
        </div>
      </div>
      <Footer blurb="Don't have an account yet?" linkText="Sign up" linkPath="/"/>
    </>
  )
}

export default Login