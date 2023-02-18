import { useLocation } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { useState,useEffect } from "react";
function Post() {
  const location = useLocation();
  const post = location.state.post;
  const date1 = new Date(post.creation_date);
  const date2 = new Date(post.last_modified);

  const [answers,setanswers]=useState([]);
  const [ansready,setansready]=useState(false);

  const handle_answers = (e) =>{
    e.preventDefault()
    setansready(false)
    axios.get('http://localhost:5000/posts/'+post.id,{}).
           then((res)=>
           {
                    setanswers(res.data.answers);
                    setansready(true);
           }).
           catch((err)=>
           {
               console.log(err);
           })
  }
  
  function List({items}){  
    return(
      <div className="flex flex-col">
        <h1 className="text-center text-2xl mt-8">Answers</h1>
      {
        items.map(
          (item,index)=>{
             return(
             <div className="flex flex-row border border-black mx-2 my-2">
              <div className="flex flex-col">
             <button className="hover:bg-blue-600">
             <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"/></svg>
             </button>
             <h3 className="text-center">{item.up_votes-item.down_votes}</h3>
             <button className="hover:bg-blue-600">
             <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.901 10.566A1.001 1.001 0 0 0 20 10h-4V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v7H4a1.001 1.001 0 0 0-.781 1.625l8 10a1 1 0 0 0 1.562 0l8-10c.24-.301.286-.712.12-1.059zM12 19.399 6.081 12H10V4h4v8h3.919L12 19.399z"/></svg>
             </button>
              </div>
              <div className="flex flex-col justify-between border border-black bg-slate-200 my-2 mx-2">
                
                <p key={index} className="bg-slate-200 [&>li]:prefg hover:bg-sky-500 rounded px-4 py-2 ">
                 {parse(item.body)}
                </p>
                <div className="flex justify-between">
                   <div className="mx-8 mb-2">answered: {date_time(item.creation_date)}</div>
                 {item.last_edited!=null &&<div className="mx-8 mb-2">last edited: {date_time(item.last_edited)}</div>}
                </div>
                <div className="flex justify-between">
                <div className="mx-8 mb-2 text-center">answered by: {item.answeredby_id}</div>
                </div>
               <p>&nbsp;&nbsp;</p> 
               <br></br>
              </div>
              </div>
  
             )
          }
        )
      }
      </div>
    )
  }

  useEffect(()=>
  {
     if(answers.length>0) setansready(true)
     console.log(answers)
  },[answers]);



  function difference(date) {
    const now = new Date();
    const diffInMonths =
      (now.getFullYear() - date.getFullYear()) * 12 +
      (now.getMonth() - date.getMonth());
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    console.log(date);
    return years + " years, " + months + " months" + " Ago";
  }

  function date_time(datetime) {
    const timestamp = datetime;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const formattedTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
  return( formattedDate + " at " + formattedTime);
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen from-red-500 to-blue-500 bg-gradient-115 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="text-center text-3xl mt-2 mb-2">{post.title}</div>
          <div className="flex justify-between w-full">
            <div className="mx-8 mb-2">Asked:{difference(date1)}</div>
            {post.last_modified!=null &&<div className="mx-8 mb-2">
              Modified:{difference(date2)}
            </div>}
          </div>
          <div className="text-left mx-8 border-2 border-black">
            <div className="mx-4 my-4 [&>pre]:prefg ">{parse(post.body)}</div>
          </div>
          {
            !ansready &&
            <div className="text-center">
          <button className="bg-indigo-500 text-white py-2 px-16 rounded-lg hover:bg-indigo-600" onClick={(e)=>handle_answers(e)}>See Answers</button>
          </div>
          }
          {
            !!ansready &&
            <List items={answers} ></List>
          }
        </div>
      </div>
    </div>
  );
}

export default Post;
