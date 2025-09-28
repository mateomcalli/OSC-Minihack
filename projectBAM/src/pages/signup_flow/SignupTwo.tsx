import { Link } from "react-router-dom"
import { IoInformationCircleOutline } from "react-icons/io5"
import type { ChangeEvent } from "react"

interface SignupTwoProps {
  customerData: {
    address1: string,
    city: string,
    state: string,
    postalCode: string,
    ssn: string
  }
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  postFunction: () => Promise<void>
}

const SignupTwo = ({ postFunction, handleChange, customerData }: SignupTwoProps) => {
  return (
    <div className="relative z-1 flex flex-col pt-16 px-4">
      <div className="flex justify-center">
        <img src="logo.png" className="w-[64px] h-[70px] mb-7 drop-shadow-md/50" />
      </div>
      <div className="mt-7" id="spacer-for-input-fields">
        <input
          onChange={handleChange}
          value={customerData.address1}
          type="text"
          name="address1"
          placeholder="Address"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <div className='flex justify-between'>
          <input
            onChange={handleChange}
            value={customerData.city}
            type="text"
            name='city'
            placeholder="City"
            className="w-3/5 h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 mr-2 focus:outline-none"
          />
          <input
            onChange={handleChange}
            value={customerData.state}
            type="text"
            name="state"
            placeholder='State'
            className='w-2/5 h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none'
          />
        </div>
          <input
            onChange={handleChange}
            value={customerData.postalCode}
            type="text"
            placeholder="Postal Code"
            name='postalCode'
            className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          />
          <input
            onChange={handleChange}
            value={customerData.ssn}
            type="number"
            placeholder="Last 4 digits of SSN"
            name='ssn'
            className='w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none'
          />
        <div className="flex items-start space-x-4">
          <IoInformationCircleOutline className='w-6 h-6 flex-shrink-0' />
          <span>
            We collect this information to verify your identity and keep your payments safe. 
            Your information is securely stored and only used for legal and compliance purposes. 
            Learn more about how Dwolla handles secure payments here.
          </span>
        </div>
        <Link onClick={postFunction} to='/home' className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
          Create account
        </Link>
      </div>
    </div>
  )
}

export default SignupTwo