import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';
const Login = () => {
        const navigate = useNavigate();
        const [userName, setUserName] = useState('');
        const [pass, setPass] = useState('');
        const [logRes,setLogRes] = useState(0);
  let handleSubmit = async (e) => {
    e.preventDefault();
    setLogRes(-1);   
    axios.post('http://localhost:5000/login', {
      userName: userName,

      password: pass,
    }).then((res) => {
      setLogRes(res.data.logRes);
      if (res.data.logRes == 1) {
        console.log('here')
        
      setTimeout(() => {
        <Loading/>
      }, 2000);

      navigate('/home2');
        
      }

    }).catch((err) => {
      
      console.log(err);
    })
  }
        
    return (  <div className="relative flex flex-col justify-center min-h-screen from-red-500 to-blue-500 bg-gradient-115 overflow-hidden">
            <div className="container mx-auto">
          <div className="flex w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-1/2 bg-register-image">
              <h1 className="text-white text-3xl text-center mt-4">Welcome</h1>
             
            </div>
            <div className="w-1/2 py-16 px-12">
              <h2 className='text-3xl text-center mb-4'>Login</h2>
              <p className='mb-4 text-center'>Enter your credentials</p>
              <form className="mt-6 " onSubmit={handleSubmit}>
                    <div className="mb-2 content-center">
                    <label className="block text-sm font-semibold text-black">
                        Username
                    </label >
                    <input className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    type="test"
                    onChange = {(e)=>setUserName(e.target.value)}>
                    </input>

                    <label className="block text-sm font-semibold text-black">
                        Password
                    </label>
                    <input className="block w-full px-4 py-2 mt-2 textblack bg-white border rounded-md focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    TYPE="text"
                    onChange = {(e)=>setPass(e.target.value)}>
                    </input>

                    
                    </div>
                    <br></br>
                    <button className="bg-slate-200 hover:bg-sky-500 rounded px-4 py-2 w-full">Login</button>
                </form>
            </div>
          </div>
        </div>

        </div>
     );
}
 
export default Login;