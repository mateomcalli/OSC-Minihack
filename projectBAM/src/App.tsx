import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/signup_flow/Signup.tsx';
import Login from './pages/Login.tsx';
import Layout from "./pages/Layout.tsx";

const App = () => {
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index path='/' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
      </Route>
    </Routes>
   </Router>
  )
}

export default App
