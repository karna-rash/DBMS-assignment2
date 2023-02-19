import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const Home2 = () => {

  const {user}=useAuthContext()

  return (
    <div className="bg-gray-100 h-screen font-sans">
      <main className="p-12">
        <section id="about" className="py-12">
          <h2 className='text-center text-3xl'>You are logged in!</h2>
          <h3>Welcome,{user.userName}</h3>
        </section>
      </main>
    </div>
  );
};

export default Home2;