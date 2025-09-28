import axios from "axios";
import { HomepageEntry } from "../components/HomepageEntry";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useEffect, useState, useMemo } from "react";

interface Transaction {
  transactionId: string;
  name: string;
  collaborators: string;
  amount: string;
  direction: 'incoming' | 'outgoing';
}

const Home = () => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`http://localhost:3000/api/auth`, { withCredentials: true });
      } catch (error) {
        console.error(error);
        window.location.href = '/login';
      }
    };

    const getTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/transactions', { withCredentials: true });
        setTransactionsList(response.data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    };

    checkAuth();
    getTransactions();
  }, []);

  const handleDelete = async (transactionId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/transaction/${transactionId}`, { withCredentials: true });
      setTransactionsList(prev => prev.filter(t => t.transactionId !== transactionId));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
  };

  const sum = useMemo(() => {
    return transactionsList.reduce((acc, transaction) => acc + Number(transaction.amount || 0), 18);
  }, [transactionsList]);

  return (
    <div className='relative z-1 flex flex-col pt-4 px-4'>
      <div className="flex justify-between">
        <img src="logo.png" className="w-[48px] h-[53px] mb-12 drop-shadow-md/50" />
        <Link to='/account'>
          <div className="w-fit h-fit pt-2">
            <LuUser className="w-10 h-10" />
          </div>
        </Link>
      </div>

      <div className="mb-6">
        <h1 className="text-4xl mb-5">You Owe</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          {transactionsList.filter(t => t.direction === 'outgoing').map((transaction) => (
            <Link to='/transactioninfo' key={transaction.transactionId}>
              <HomepageEntry
                paymentName={transaction.name}
                collaborators={transaction.collaborators}
                amountPaid={`$${transaction.amount}`}
                transactionId={transaction.transactionId}
                onDelete={handleDelete}
                direction='outgoing'
              />
            </Link>
          ))}
          {transactionsList.filter(t => t.direction === 'outgoing').length === 0 && (
            <p className="text-center text-gray-500">No pending payments.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-4xl mb-5">Owed to You</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          {transactionsList.filter(t => t.direction === 'incoming').map((transaction) => (
            <Link to='/transactioninfo' key={transaction.transactionId}>
              <HomepageEntry
                paymentName={transaction.name}
                collaborators={transaction.collaborators}
                amountPaid={`$${transaction.amount}`}
                transactionId={transaction.transactionId}
                onDelete={handleDelete}
                direction='incoming'
              />
            </Link>
          ))}
          {transactionsList.filter(t => t.direction === 'incoming').length === 0 && (
            <p className="text-center text-gray-500">No incoming payments.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl mb-3">Recent transactions</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          <HomepageEntry
            key={'placeholder'}
            paymentName={"Sunny side up"}
            collaborators={"dakshegan@gmail.com"}
            amountPaid={"$18.00"}
          />
        </div>
      </div>

      <div className="mb-10">
        <h1 className="text-2xl mb-3">Spending data</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          <HomepageEntry
            paymentName="This month:"
            collaborators=""
            amountPaid={`$${sum.toFixed(2)}`}
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Link to='/new' className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white">
          <span className='font-semibold leading-none text-6xl -translate-y-1'>+</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
