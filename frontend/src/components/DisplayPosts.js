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
    //     <div>
    //         <div>
    //     {
            
    //         posts.map((post)=>(
    //          <div >
    //            {posts.title}
    //          </div>
    //         ))
    //     }
    //     </div>
    //  <div className="justify-between"> <button className="border w-10 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleBack}>back</button> {curpagenum} of {totpagenum} <button className="border w-10 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleNext}>next</button></div>
    //     </div>
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            {/* Table header */}
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b bg-gray-50">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">tags</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {/* Map through the data and create a row for each item */}
              {posts.map((post) => (
                <tr key={post.id} className="bg-white divide-y">
                  <td className="px-4 py-3">{post.title}</td>
                  <td className="px-4 py-3">{post.tags}</td>
                  {/* Add more cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="justify-between w-full"> <button className="border w-24 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleBack}>back</button> {curpagenum} of {totpagenum} <button className="border w-24 bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-red-600" onClick={handleNext}>next</button></div>
      </div>
    )
}

export default DisplayPosts;