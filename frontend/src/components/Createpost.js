import showdown from 'showdown'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react';
//import { useAuthContext } from '../hooks/useAuthContext';

const Createpost = () => {
   // const { user }=useAuthContext() 
    const [body, setBody] = useState("**Hello world!!!**");
    const [title,settitle]=useState();
    const [tags,setTags] = useState([]);
   // console.log(user)
    //const Ownername=user;
    useEffect(() => {
      const config = {
        headers: {
          Authorization: `Bearer ${document.cookies}`,
        },
      };
    },[]);

    const handleSubmit=(e)=>{
      e.preventDefault();
     let converter = new showdown.Converter();
     let html     = converter.makeHtml(body);
     axios.post('http://localhost:5000/create_post',
     {
      headers: {
        Authorization: `Bearer ${document.cookies}`,
      },
      title:title,
      body:html,
      tags:tags
     })
     .then((res)=>
     {

     }).catch((err)=>
     {

     }) 

    }
    
    return (
      <div className="flex flex-col justify-center min-h-screen from-red-500 to-blue-500 bg-gradient-115 overflow-hidden">
        <div className="flex flex-col bg-white mx-20 rounded-md ">
          <h1 className="text-3x1 text-center">Create Post</h1>
          <form className='mt-6 mx-5' onSubmit={handleSubmit}>
            <label>Post title</label>
          <input className="block w-full px-4 py-2 mt-2 textblack bg-white border rounded-md focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    TYPE="text"
                    onChange = {(e)=>settitle(e.target.value)}>
                    </input>
          <label>Post body</label>   
          <MDEditor
          value={body}
          onChange={setBody}
        />
      <button className="bg-slate-200 hover:bg-sky-500 rounded px-4 py-2 w-auto">Submit</button>

          </form>
               
        </div>
         </div>
    );
}
 
export default Createpost;