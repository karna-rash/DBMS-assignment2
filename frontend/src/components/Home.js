import React from 'react';

const Home = () => {
  return (
    <div className="bg-gray-100 h-screen font-sans">
      <main className="p-12">
        <section id="about" className="py-12">
          <h2 className="text-3xl font-bold text-indigo-500 text-center">About us</h2>
          <p className="text-gray-700">This is a Community Question Answer(CQA) website</p>
        </section>
        <section id="contact" className="py-12">
          <h2 className="text-3xl font-bold text-indigo-500 text-center">Contact</h2>
          <form className="text-gray-700" action="submit-form.php" method="post">
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">Name:</label>
              <input type="text" id="name" name="name" className="w-full border border-gray-400 p-2 rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block font-bold mb-2">Email:</label>
              <input type="email" id="email" name="email" className="w-full border border-gray-400 p-2 rounded-lg" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block font-bold mb-2">Message:</label>
              <textarea id="message" name="message" rows="5" className="w-full border border-gray-400 p-2 rounded-lg"></textarea>
            </div>
            <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600">Submit</button>
          </form>
        </section>
      </main>
      <footer className="bg-black p-6">
        <p className="text-white text-center">&copy;</p>
      </footer>
    </div>
  );
};

export default Home ;