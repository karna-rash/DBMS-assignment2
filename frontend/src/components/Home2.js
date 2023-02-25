import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect } from 'react';
import Navbar from './Navbar';

const Home2 = () => {

  const {user}=useAuthContext()
  return (
    <div><Navbar/>
    <div className="relative flex flex-col min-h-screen from-red-500 to-yellow-500 bg-gradient-115 overflow-hidden">
      <main className="p-12">
        <section id="about" className="py-12">
          <div className='flex flex-col bg-white items-center justify-center w-full'>

        <h2 className='text-3xl text-center'>Welcome  </h2>
        <button className="bg-sky-400 hover:bg-sky-500 rounded px-4 py-2 w-1/4 text-center mt-4"><a href="http://localhost:3000/create_post">Create Post</a></button>
          </div>
        </section>
      </main>
    </div>
    </div>
  );
};

export default Home2;