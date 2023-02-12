import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Login = () => {
        const navigate = useNavigate();
        const [userName, setUserName] = useState('');
        const [pass, setPass] = useState('');
        const [logRes,setLogRes] = useState(0);
  let handleSubmit = async (e) => {
    setLogRes(-1);   
    axios.post('http://localhost:5000/login', {
      userName: userName,

      pass: pass,
    }).then((res) => {
      setLogRes(res.data.logRes);
      if (res.data.logRes == 1) {
        document.cookie = "token="+res.data.token;
        navigate('/student/');
      }

    }).catch((err) => {
      console.log(err);
    })
  }
        
    return (  <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-orange-300 border-0 rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-center text-3x1 font-semibold text-black ">Log in</h1>


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
     );
}
 
export default Login;