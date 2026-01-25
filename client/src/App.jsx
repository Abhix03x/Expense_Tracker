import React from 'react'
import { BrowserRouter as Router,Routes,Route,Navigate } from 'react-router-dom'; 
import Login from './pages/Auth/Login.jsx';
import SignUp from './pages/Auth/SignUp.jsx';
import Home from './pages/Dashboard/Home.jsx';

const App = () => {
  return (
    <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root/>}/>
            <Route path='/login' exact element={<Login/>}/>
            <Route path='/signup' exact element={<SignUp/>}/>
            <Route path='/dashboard' exact element={<Home/>}/>
          </Routes>
        </Router>
    </div>
  )
}

const Root = () =>{
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (<Navigate to="/dashboard"/>):(<Navigate to="/login"/>);
};

export default App;
