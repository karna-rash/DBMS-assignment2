import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import DisplayPosts from './DisplayPosts';
import { useCookies } from 'react-cookie';

const Home2 = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
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
          'Authorization': `Bearer ${cookies}`
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
              <div className='flex flex-row bg-white text-center justify-between w-1/2'>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"><a href="http://localhost:3000/create_post">Create Post</a></button>
                <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={(e)=>handleSearch(e)}>See posts</button>


              </div>
              </div>
          </section>
        </main>
      {!!postsReady && (
        <div className='flex flex-col bg-white items-center justify-center rounded-lg mx-12'>
            <DisplayPosts
              posts={posts}
              pages={pages}
              params={
                {searchOption: 'home2',
                 Edit_status: 1
              }}
            />
            </div>
          )}
      </div>
      
    </div>
  );
};

export default Home2;