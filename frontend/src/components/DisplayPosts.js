import { useEffect, useState } from "react";
import axios from "axios";

function DisplayPosts(props)
{
const [params,setparams] = useState([]);
const [totpagenum,settotpagenum] = useState(0);
const [posts,setPosts] = useState([]);
const [curpagenum,setCurpagenum] = useState(1);

useEffect(()=>
{
    setPosts(props.posts);
    settotpagenum(props.pages)
    setparams(props.params)
},[])


function handleBack()
{
  if(curpagenum != 1)
  {
       if(params.searchOption == 'tag')
       {
           axios.get('http://localhost:5000/posts/'+params.searchValue+'/'+curpagenum-1,{}).
           then((res)=>
           {

           }).
           catch((err)=>
           {

           })
       }
  }
}

function handleNext()
{
  if(curpagenum != totpagenum)
  {
    if(params.searchOption == 'tag')
       {
           axios.get('http://localhost:5000/posts/'+params.searchValue+'/'+curpagenum+1,{}).
           then((res)=>
           {

           }).
           catch((err)=>
           {
            
           })
       }
  }
}

    return (
        <div>
            Hello
            {/* <div>
        {
            posts.map((post)=>(
             <div>
               
             </div>
            ))
        }
        </div>
     <div>Page <button onClick={handleBack}>back</button> {curpagenum} of {totpagenum} <button onClick={handleNext}>next</button></div> */}
        </div>
    )
}

export default DisplayPosts;