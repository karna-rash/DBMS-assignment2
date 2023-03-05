import React from 'react';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div><Navbar/>
    <div className="relative flex flex-col justify-center min-h-screen from-mycolour to-mycolour2 bg-gradient-115 overflow-hidden">
    <div className="flex flex-col justify-center items-center rounded-lg bg-gray-100 mx-8">
    <div className="w-1/2 h-72 mt-4 bg-register-image">
              <h1 className="text-white text-3xl text-center mt-4">Welcome</h1>
             
            </div>
      <main className="p-12">
        <section id="about" className="py-12">
          <h2 className="text-3xl font-bold text-indigo-500 text-center">About us</h2>
          <p className="text-gray-700">This is a Community Question Answer(CQA) website developed for DBMS assignment. A CQA website is an online platform where users can ask questions on various topics and get answers from other members of the community. This website include features like tags, create,edit or delete posts, search post by tags, usernames, sorting by time, upvotes.</p>
        </section>
        <section id="contact" className="py-12 bg-gray-100">
  <h2 className="text-3xl font-bold text-indigo-500 text-center mb-8">Contact Us</h2>
  <div className='flex flex-col max-w-xl mx-auto'>
    <div className="mb-4">You can contact us at IITH or email us at:</div>
    <div className="mb-2">
      <span className="font-medium">cs21btech11014@iith.ac.in</span> (Chittepu Rutheesh Reddy)
    </div>
    <div className="mb-2">
      <span className="font-medium">cs21btech11055@iith.ac.in</span> (Sadineni Abhinay)
    </div>
    <div className="mb-2">
      <span className="font-medium">cs21btech11017@iith.ac.in</span> (G Harsha Vardhan Reddy)
    </div>
    <div className="mb-2">
      <span className="font-medium">cs21btech11030@iith.ac.in</span> (Kotikalapudi Karthik)
    </div>
  </div>
</section>

      </main>
    </div>
    </div>
    </div>
  );
};

export default Home ;