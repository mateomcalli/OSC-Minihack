const SignupOne = () => {
  return (
    <div className="relative z-1">
      <div className="flex flex-col">
        <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
        <h1 className="font-default text-gray-500 text-4xl">Sign Up</h1>
      </div>
      <div className="mt-7" id="spacer-for-input-fields">
        <input
          type="text"
          name="firstName'"
          placeholder="First Name"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <input
          type="email"
          placeholder="E-mail Address"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <div className="w-full h-12 bg-white rounded-2xl flex items-center justify-between px-5 mb-5 text-gray-400">
          <input
            type="date"
            className="flex-1 bg-transparent focus:outline-none text-gray-700"
          />
        </div>
        <div className="flex justify-center mb-5">
          <div className="flex items-center space-x-2 w-full max-w-md">
            <img src="usa.png" className="w-8 h-8 mr-4" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="flex-1 h-12 bg-white rounded-2xl px-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <input
          type="password"
          placeholder="Password"
          className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
          Register
        </button>
      </div>
    </div>
  )
}

export default SignupOne