import Login from './components/Login';
import Navbar from './components/Navbar';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Student/Home";

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
       {token && <Navbar1/>}

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
