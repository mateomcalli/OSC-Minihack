import axios from "axios"
import { useState } from "react"

const App = () => {
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
    <div className='bg-black flex min-w-screen min-h-screen items-center'>
      <p className='text-white'>hi</p>
    </div>
  )
}

export default App
