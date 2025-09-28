import axios from "axios"
import { useState, useRef } from "react"
import { Link } from "react-router-dom"

interface NewTransactionProps {
  paymentName: string
  collaborators: Array<string>
  amountPaid: number
}

const New = () => {
  const [transaction, setTransaction] = useState<NewTransactionProps>({
    paymentName: "",
    collaborators: [],
    amountPaid: 0,
  })

  const formRef = useRef<HTMLFormElement | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setTransaction((prev) => ({
      ...prev,
      [name]:
        name === "collaborators"
          ? value.split(",").map((c) => c.trim())
          : name === "amountPaid"
          ? parseFloat(value) || 0
          : value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      console.log("Submitting:", transaction)
      await axios.post("http://localhost:3000/api/transaction", transaction, {withCredentials: true})

      setTransaction({
        paymentName: "",
        collaborators: [],
        amountPaid: 0,
      })
      formRef.current?.reset()
    } catch (error) {
      console.error("Error submitting transaction:", error)
    }
  }

  return (
    <div className="relative z-1 flex flex-col h-screen justify-center pt-10 px-4">
      <div className="flex flex-col justify-center items-center">
        <Link to='/home'><img
          src="logo.png"
          className="w-[64px] h-[70px] mb-8 drop-shadow-md/50"
        /></Link>
        <h1 className="text-4xl mb-10">New Transaction</h1>
      </div>

      <form onSubmit={handleSubmit} ref={formRef}>
        <p className="mb-1">Name of Transaction</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Lunch"
          name="paymentName"
          value={transaction.paymentName}
          onChange={handleChange}
          type="text"
        />

        <p className="mb-1">Collaborators (comma-separated)</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="Ben Kafin, Alice Doe"
          name="collaborators"
          value={transaction.collaborators.join(", ")}
          onChange={handleChange}
          type="text"
        />

        <p className="mb-1">Amount</p>
        <input
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
          placeholder="50.00"
          name="amountPaid"
          value={transaction.amountPaid || ""}
          onChange={handleChange}
          type="number"
          step="0.01"
        />

        <button
          className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium hover:cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default New