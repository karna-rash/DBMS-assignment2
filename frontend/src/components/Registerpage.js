import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import '../App.css';
import axios from 'axios'
function Registerpage() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [dispName, setDispName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [regRes, setRegRes] = useState('0');

  let handleSubmit = async (e) => {
    setRegRes(-2);
    e.preventDefault();

    axios.post('http://localhost:5000/register', {
      userName: userName,

      pass: pass,
      email: email
    }).then((res) => {
      setRegRes(res.data.regRes);


    }).catch((err) => {
      console.log(err);
    });




  };
  return (

    <div className="App">
      <Navbar />
      {
        regRes == -2 && <p>Processing please wait.... Don't Click Button again</p>
      }

      {
        regRes == 0 && <p>Enter inputs in below fields</p>
      }
      {regRes == 1 && navigate('/register/' + userName)}
      {
        regRes == -1 && <p>This username already taken, Enter a different username</p>
      }
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userName}
          placeholder="userame"
          required
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          value={userName}
          placeholder="display name"
          required
          onChange={(e) => setDispName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={pass}
          placeholder="password"
          required
          onChange={(e) => setPass(e.target.value)}
        />

        <button type="submit">Register</button>



      </form>
    </div>

  );
}

export default Registerpage;