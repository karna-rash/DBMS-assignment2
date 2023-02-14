import Login from './components/Login';
import Register from './components/Registerpage';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Home2 from './components/Home2';
import Posts from './components/Posts';
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
        //  <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/home2" element={<Home2 />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/posts" element={<Posts />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
