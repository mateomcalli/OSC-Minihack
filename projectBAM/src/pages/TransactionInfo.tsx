import { Link } from "react-router-dom"

const TransactionInfo = () => {
  return(
    <div>
      <div>
      <div className='relative z-1 flex flex-col pt-10 px-4'>
        <div className="flex justify-center">
        <Link to='/home'><img src="logo.png" className="w-[64px] h-[70px] mb-10 drop-shadow-md/50"/></Link>
      </div>
      <h1 className="text-2xl mb-5 flex">Transaction Info:</h1>
      <div className="bg-white shadow rounded-2xl p-4 mb-10 space-y-4">
      </div>
    </div>
  </div>
    </div>
  )
}

export default TransactionInfo