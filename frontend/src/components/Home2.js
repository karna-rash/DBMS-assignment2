import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import DisplayPosts from './DisplayPosts';
const Home2 = () => {

  const [postsReady, setPostsReady] = useState(0);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState(0);
  const handleSearch = (e) => {
    e.preventDefault();
    setPostsReady(0);
    axios
      .post("http://localhost:5000/home2" ,{
      },{
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${document.cookie}`
        }})
      .then(async (res) => {
        setPosts(res.data.posts);
        setPages(res.data.totpage);
        setPostsReady(1)
       })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <div><Navbar />
      <div className="relative flex flex-col min-h-screen from-red-500 to-yellow-500 bg-gradient-115 overflow-hidden">
        <main className="p-12">
          <section id="about" className="py-12">
            <div className='flex flex-col bg-white items-center justify-center w-full'>

              <h2 className='text-3xl text-center'>Welcome  </h2>
              <button className="bg-sky-400 hover:bg-sky-500 rounded px-4 py-2 w-1/4 text-center mt-4"><a href="http://localhost:3000/create_post">Create Post</a></button>
                <button className="bg-sky-400 hover:bg-sky-500 rounded px-4 py-2 w-1/4 text-center mt-4" onClick={(e)=>handleSearch(e)}>See posts</button>
            </div>
          </section>
        </main>
        <div >
      {!!postsReady && (
            <DisplayPosts
              posts={posts}
              pages={pages}
              params={
                {searchOption: 'home2'
              }}
            />
          )}
      </div>
      </div>
      
    </div>
  );
};

export default Home2;