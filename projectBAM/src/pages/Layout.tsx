import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-[#EDF1F3]">
      <div className="flex-grow px-8 py-24">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/60 to-transparent backdrop-blur-md rounded-b-3xl"></div>
        <Outlet/>
      </div>
    </div>
  )
}

export default Layout