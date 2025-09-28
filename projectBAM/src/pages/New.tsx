import HomepageEntry from "../components/HomepageEntry"
import { useState } from "react"

interface HomepageEntryProps {
  paymentName: string
  collaborators: string
  amountPaid: string
}

const New = () => {
  const [transaction, setTransaction] = useState<HomepageEntryProps>({
    paymentName: '',
    collaborators: '',
    amountPaid: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
    console.log(transaction)
  }

  return (
    <div className='relative z-1 flex flex-col pt-10 px-4'>
      <div className="flex flex-col justify-center items-center">
        <img src="logo.png" className="w-[64px] h-[70px] mb-8 drop-shadow-md/50" />
        <h1 className="text-4xl mb-10">New Transaction</h1>
      </div>
        <p className="mb-1">Name of Transaction</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Yesterday's lunch"
          value={transaction.paymentName}
          onChange={handleChange}
          type='text'
        />
        <p className="mb-1">Collaborators</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder=""
          value={transaction.paymentName}
          onChange={handleChange}
          type='text'
        />


      </div>
  )
}

export default New