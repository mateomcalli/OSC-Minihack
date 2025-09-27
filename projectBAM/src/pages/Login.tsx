const Login = () => {
	return (
			<div className="w-screen min-h-screen flex flex-col bg-[#EDF1F3] red">
      <div className="flex-grow px-8 py-24">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/60 to-transparent backdrop-blur-md rounded-b-3xl"></div>
        <div className="relative z-1 flex flex-col green">
          <div className="flex flex-col">
            <img src="logo.png" className="w-[64px] h-[70px] mb-7" />
            <h1 className="font-default text-gray-500 text-4xl">Log In</h1>
          </div>
          <div className="mt-7" id="spacer-for-input-fields">
            <input
              type="email"
              placeholder="E-mail Address"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full h-12 bg-white rounded-2xl px-5 mb-5 text-gray-700 placeholder-gray-400 focus:outline-none"
            />
            <button className="w-full h-14 bg-primary rounded-2xl flex items-center justify-center px-5 mb-5 mt-10 text-white font-medium">
              Log in
            </button>
          </div>
        </div>
      </div>

      <footer className="pb-6 text-center text-gray-500">
        Don't have an account yet?{" "}
        <a href="/login" className="text-blue-600 font-medium underline hover:text-blue-900">Sign up</a>
      </footer>
    </div>
	)
}

export default Login