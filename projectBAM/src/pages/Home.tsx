import axios from "axios";
import { HomepageEntry } from "../components/HomepageEntry";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";



const Home = () => {
  const [transactionsList, setTransactionsList] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth`, { withCredentials: true })
      } catch (error) { 
        console.error(error)
        window.location.href = '/login'
      }
    }

    const getTransactions = async () => {
      const response = await axios.get('http://localhost:3000/api/transactions', { withCredentials: true });
      setTransactionsList(response.data); 
    }
    checkAuth()
    getTransactions()
  }, [])

  return (
    <div className='relative z-1 flex flex-col pt-4 px-4'>
      <div className="flex justify-between">
        <img src="logo.png" className="w-[48px] h-[53px] mb-12 drop-shadow-md/50" />
        <Link to='/account'><div className="w-fit h-fit pt-2"><LuUser className="w-10 h-10"/></div></Link>
      </div>
      <div className="mb-6">
        <h1 className="text-4xl mb-5">Active</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          <Link to='/transactioninfo'><HomepageEntry paymentName='Weekend Trip' collaborators="Daksh and 2 others" amountPaid="$56.09 left"/></Link>
          </div>
      </div>
    <div className="mb-6">
      <h1 className="text-2xl mb-3">Recent transactions</h1>
      <div className="bg-white shadow rounded-2xl p-4 space-y-4">
        {transactionsList.map((transaction, i) => (
          <HomepageEntry
            key={i}
            paymentName={transaction.name}
            collaborators={transaction.collaborators}
            amountPaid={transaction.amount}
          />
        ))}
      </div>
    </div>
     <div className="mb-10">
      <h1 className="text-2xl mb-3">Spending data</h1>
      <div className="bg-white shadow rounded-2xl p-4 space-y-4">
        <HomepageEntry paymentName="This month:" collaborators="" amountPaid="$163.20 spent"/>
        </div>
    </div>
      <div className="flex items-center justify-center">
        <Link to='/new' className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white">
          <span className='font-semibold leading-none text-6xl -translate-y-1'>+</span>
        </Link>
      </div>
    </div>
  )
}

export default Home