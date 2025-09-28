import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/signup_flow/Signup.tsx';
import Login from './pages/Login.tsx';
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import New from "./pages/New.tsx";
import Account from "./pages/Account.tsx";

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/new' element={<New />}/>
        <Route path='/account' element={<Account />}/>
      </Route>
    </Routes>
   </Router>
  )
}

export default App