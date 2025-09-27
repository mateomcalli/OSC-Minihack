import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';

const App = () => {
  return (
   <Router>
    <Routes>
      <Route index path='/' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
   </Router>
  )
}

export default App
