import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import HomepageEntry from "../components/HomepageEntry";


const Home = () => {
  return (
    <div className='relative z-1 flex flex-col pt-4 px-4'>
      <div className="flex justify-between">
        <img src="logo.png" className="w-[48px] h-[53px] mb-12 drop-shadow-md/50" />
        <div className="w-fit h-fit pt-2"><LuUser className="w-10 h-10"/></div>
      </div>
      <div className="mb-6">
        <h1 className="text-4xl mb-5">Active</h1>
        <div className="bg-white shadow rounded-2xl p-4 space-y-4">
          <HomepageEntry paymentName='Weekend Trip' collaborators="Daksh and 2 others" amountPaid="$56.09 left"/>
          </div>
      </div>
    <div className="mb-6">
      <h1 className="text-2xl mb-3">Recent transactions</h1>
      <div className="bg-white shadow rounded-2xl p-4 space-y-4">
        <HomepageEntry paymentName="Dinner" collaborators='Ben and 3 others' amountPaid="$183.23"/>
        <HomepageEntry paymentName="Groceries" collaborators='Alice and 2 others' amountPaid="$96.20"/>
        <HomepageEntry paymentName="Tab" collaborators='Nick and 12 others' amountPaid="$531.94"/>
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