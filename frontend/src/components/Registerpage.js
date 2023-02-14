import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'
import axios from 'axios'
import Loading from './Loading';
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
      dispName:dispName,
      password: pass,
      email: email
    }).then((res) => {
      setRegRes(res.data.regRes);


    }).catch((err) => {
      console.log(err);
    });




  };
  return (
//-2 for processing the request
//-1 for username already taken, display the form again
//0 for initial
//1 for succesful response , navigate to login page, notify for a second that account creation is successful
    <div className="App">
      
      {
        regRes == -2 && <Loading/>
      }

   //   {regRes == 1 && navigate('/register/' + userName)}
      {
        regRes == -1 && <p>This username already taken, Enter a different username</p>
      }
      {
         regRes ==0 &&   <div>
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
}
    </div>

  );
}

export default Registerpage;