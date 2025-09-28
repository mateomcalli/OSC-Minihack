import axios from "axios"
import { useState } from "react"
import SignupOne from "./SignupOne"
import SignupTwo from "./SignupTwo"
import Footer from "../../components/Footer"

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

const Signup = () => {  
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    type: 'personal',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    ssn: '',
  })
  
  const [step, setStep] = useState<number>(1)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
    console.log(customerData)
  }
  
  const postFunction = async () => {
    try { 
      await axios.post('http://localhost:3000/api/signup', customerData, { withCredentials: true })
      console.log('Successfully posted customer data for customer ', customerData?.firstName)
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <>
      {step == 1 &&
        <>
          <SignupOne setStep={setStep} handleChange={handleChange} customerData={customerData}/>
          <Footer blurb="Already have an account?" linkText="Login" linkPath="/login"/>
        </>
      }

      {step == 2 &&
        <SignupTwo postFunction={postFunction} handleChange={handleChange} customerData={customerData}/>
      }
    </>
  )
}

export default Signup