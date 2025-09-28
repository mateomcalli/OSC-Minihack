import type { ChangeEvent } from "react"

interface SignupOneProps {
  customerData: {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    phoneNumber: string
    password: string
  }
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  setStep: React.Dispatch<React.SetStateAction<number>>
}

const SignupOne = ({ setStep, handleChange, customerData }: SignupOneProps) => {
  const handleClick = () => {
    setStep(prev => prev + 1)
  }

  return (
    <div className="relative z-1 pt-16 px-4">
      <div className="flex flex-col">
        <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
        <h1 className="font-default text-gray-500 text-4xl">Sign Up</h1>
      </div>
      <div className="mt-7" id="spacer-for-input-fields">
        <input
          onChange={handleChange}
          value={customerData.firstName}
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <input
          onChange={handleChange}
          value={customerData.lastName}
          type="text"
          name='lastName'
          placeholder="Last Name"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <input
          onChange={handleChange}
          value={customerData.email}
          type="email"
          name='email'
          placeholder="E-mail Address"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <div className="w-full h-12 bg-white rounded-2xl flex items-center justify-between px-5 mb-5 text-gray-400">
          <input
            onChange={handleChange}
            value={customerData.dateOfBirth}
            type="date"
            placeholder='Date of Birth'
            name='dateOfBirth'
            className="flex-1 bg-transparent focus:outline-none placeholder-gray-400 text-gray-700"
          />
        </div>
        <div className="flex justify-center mb-5">
          <div className="flex items-center space-x-2 w-full">
            <img src="usa.png" className="w-8 h-8 mr-4" />
            <input
              onChange={handleChange}
              value={customerData.phoneNumber}
              type="tel"
              name='phoneNumber'
              placeholder="Phone Number"
              className="flex-1 h-12 bg-white rounded-2xl px-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <input
          onChange={handleChange}
          value={customerData.password}
          type="password"
          name='password'
          placeholder="Password"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button onClick={handleClick} className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
          Register
        </button>
      </div>
    </div>
  )
}

export default SignupOne