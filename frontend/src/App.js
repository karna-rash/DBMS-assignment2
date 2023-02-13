import Login from './components/Login';
import Register from './components/Registerpage';
import Navbar from './components/Navbar';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  useEffect(() => {
    // localStorage.clear('token');
    //Have to sort this
  }, []);
const token = sessionStorage.getItem('token');
  return (
    <Router>
      <div>
      {!token && <Navbar/>}
     

        <Routes>
        //  <Route exact path="/" element={<div><h1>Homepage</h1></div>}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
