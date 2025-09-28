import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";

interface NewBankAccountProps {
  routingNumber: string
  accountNumber: string
  bankAccountType: string
  name: string
}

const Account = () => {
  const [bankAccount, setBankAccount] = useState<NewBankAccountProps>({
    routingNumber: "",
    accountNumber: "",
    bankAccountType: "",
    name: ""
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setBankAccount((prev)=>({
      ...prev,
      [name] : value
    }));
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log("Submitting:", bankAccount)
      await axios.post("http://localhost:3000/api/transaction", bankAccount, {withCredentials: true})

      setBankAccount({
        routingNumber: "",
        accountNumber: "",
        bankAccountType: "",
        name: ""
      })
      formRef.current?.reset()
    } catch (error) {
      console.error("Error submitting transaction:", error)
    }
  }

  return (
    <div>
      <div className='relative z-1 flex flex-col pt-10 px-4'>
        <div className="flex justify-center">
        <Link to='/home'><img src="logo.png" className="w-[64px] h-[70px] mb-10 drop-shadow-md/50"/></Link>
      </div>
      <h1 className="text-2xl mb-5 flex">User Information:</h1>
      <div className="bg-white shadow rounded-2xl p-4 mb-10 space-y-4">
      </div>
      <h1 className='text-2xl mb-5 flex'>Add New Bank Account:</h1>

      <form onSubmit={handleSubmit} ref={formRef}>
        <p className="mb-1">Routing Number</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder=""
          name="routingNumber"
          value={bankAccount.routingNumber}
          onChange={handleChange}
          type="text"
        />

        <p className="mb-1">Account Number</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder=""
          name="accountNumber"
          value={bankAccount.accountNumber}
          onChange={handleChange}
          type="text"
        />

        <p className="mb-1">Bank Account Type</p>
        <select name="bankAccountType" value={bankAccount.bankAccountType}
          onChange={(e) =>
            setBankAccount((prev) => ({
              ...prev,
              bankAccountType: e.target.value,
            }))
          }
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none">
          <option value="">Select account type</option>
          <option value="checking">Checking</option>
          <option value="savings">Savings</option>
        </select>

        <button
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium hover:cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  )
}

export default Account