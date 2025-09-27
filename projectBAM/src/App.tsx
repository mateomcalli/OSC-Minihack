import { IoMdCalendar } from "react-icons/io";

const App = () => {
  return (
    <body className="w-screen h-screen bg-[#EDF1F3]">
      <div className='px-8 py-32'>
        <img src='logo.png' className="w-[64px] h-[70px] mb-7"></img>
        <h1 className='font-default text-gray-500 text-4xl'>Sign up</h1>
        <div className='mt-7' id='spacer-for-input-fields'>
          <div className='w-full h-12 bg-white rounded-2xl flex items-center justify-start p-5 mb-5 text-gray-400'>First Name</div>
          <div className='w-full h-12 bg-white rounded-2xl flex items-center justify-start p-5 mb-5 text-gray-400'>Last Name</div>
          <div className='w-full h-12 bg-white rounded-2xl flex items-center justify-start p-5 mb-5 text-gray-400'>E-mail Address</div>
          <div className='w-full h-12 bg-white rounded-2xl flex items-center justify-between p-5 mb-5 text-gray-400'>
            <span>Date of Birth</span>
            <IoMdCalendar size='24'/>
          </div>
          <div className="flex justify-center mb-5">
          <div className="flex items-center space-x-2 w-full max-w-md">
            <img src="usa.png" className="w-8 h-8 mr-4"/>
            <div className="flex-1 h-12 bg-white rounded-2xl flex items-center px-5 text-gray-400">
              Phone Number
            </div>
          </div>
          </div>
          <div className='w-full h-12 bg-white rounded-2xl flex items-center justify-start p-5 mb-5 text-gray-400'>Password</div>
          <div className='w-full h-14 bg-primary rounded-2xl flex items-center justify-center p-5 mb-5 mt-10 text-white'>Register</div>
        </div>
      </div>

      <footer className="pb-6 text-center text-gray-500">
    Already have an account?{" "}
    <a href="/login" className="text-blue-600 font-medium underline hover:text-blue-900">
      Log in
    </a>
  </footer>
    </body>
  )
}

export default App
