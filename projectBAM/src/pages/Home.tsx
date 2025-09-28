import axios from "axios";
import { HomepageEntry } from "../components/HomepageEntry";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import { useEffect, useState, useMemo } from "react";

const Home = () => {
  const [transactionsList, setTransactionsList] = useState<any[]>([]);

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
        <h1 className="text-4xl mb-5">Active</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          <Link to='/transactioninfo'>
            {transactionsList.map((transaction, i) => (
              <HomepageEntry
                key={i}
                paymentName={transaction.name}
                collaborators={transaction.collaborators}
                amountPaid={`$${transaction.amount}`}
              />
            ))}
          </Link>
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
