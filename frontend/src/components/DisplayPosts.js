import { useState } from "react";

function DisplayPosts(props)
{
const [totpagenum,settotpagenum] = useState(0);
const [posts,setPosts] = useState([]);
const [curpagenum,setCurpagenum] = useState(1);
setPosts(props.posts);
settotpagenum(props.pages)

function handleBack()
{
  if(curpagenum != 1)
  {

  }
}

function handleNext()
{
  if(curpagenum != totpagenum)
  {
    
  }
}

    return (
        <div>
            <div>
        {
            posts.map((post)=>(
             <div>
               
             </div>
            ))
        }
        </div>
     <div>Page <button onClick={handleBack}>back</button> {curpagenum} of {totpagenum} <button onClick={handleNext}>next</button></div>
        </div>
    )
}

export default DisplayPosts;