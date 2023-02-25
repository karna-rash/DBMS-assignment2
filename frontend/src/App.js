import Login from './components/Login';
import Register from './components/Registerpage';
import Navbar from './components/Navbar';
import Navbar1 from './components/Navbar1';
import Home from './components/Home';
import Home2 from './components/Home2';
import Posts from './components/Posts';
import Post from './components/Post'
import Createpost from './components/Createpost';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  useEffect(() => {
     localStorage.clear('token_status');
    //Have to sort this
  }, []);
const token = localStorage.getItem('token_status');

  return (
    <Router>
      <div>
      {!token && <Navbar/>}
      {token && <Navbar1/>}

        <Routes>
         <Route exact path="/" element={<Home />}></Route>

          <Route exact path="/home2" element={<Home2 />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/posts" element={<Posts />}></Route>
          <Route exact path="/posts/:id" element={<Post />}></Route>
          <Route exact path="/create_post" element={<Createpost/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
