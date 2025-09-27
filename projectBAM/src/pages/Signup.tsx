import axios from "axios"
import { useState } from "react"

const Signup = () => {
  interface CustomerData {
    firstName: string,
    lastName: string,
    email: string,
    type: string,
    address: string,
    city: string,
    state: string,
    postalCode: string,
    dateOfBirth: string,
    ssn: string,
  }
  
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    type: 'personal',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    dateOfBirth: '',
    ssn: '',
  })
  
  const [step, setStep] = useState<number>(1)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }
  
  const postFunction = async () => {
    try { 
      await axios.post('https://api-sandbox.dwolla.com/customers', customerData)
      console.log('Successfully posted customer data for customer ', customerData?.firstName)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#EDF1F3]">
      <div className="flex-grow px-8 py-24">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/60 to-transparent backdrop-blur-md rounded-b-3xl"></div>
        <div className="relative z-1">
          <div className="flex flex-col">
            <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
            <h1 className="font-default text-gray-500 text-4xl">Sign Up</h1>
          </div>
          <div className="mt-7" id="spacer-for-input-fields">
            <input
              type="text"
              name="firstName'"
              placeholder="First Name"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="E-mail Address"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <div className="w-full h-12 bg-white rounded-2xl flex items-center justify-between px-5 mb-5 text-gray-400">
              <input
                type="date"
                className="flex-1 bg-transparent focus:outline-none text-gray-700"
              />
            </div>
            <div className="flex justify-center mb-5">
              <div className="flex items-center space-x-2 w-full max-w-md">
                <img src="usa.png" className="w-8 h-8 mr-4" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="flex-1 h-12 bg-white rounded-2xl px-5 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
              Register
            </button>
          </div>
        </div>
      </div>

      <footer className="pb-6 text-center text-gray-500 bg-[#EDF1F3]">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 font-medium underline hover:text-blue-900">Log in</a>
      </footer>
    </div>
  )
}

export default Signup