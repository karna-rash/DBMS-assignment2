import { useEffect, useState } from "react";
import DisplayPosts from "./DisplayPosts";
import Autocomplete from './Autocomplete';
import axios from 'axios'
function Posts(props)
{
const [searchValue,setSearchValue] = useState('');
const [searchOption,setSearchOption] = useState('tag');
const [autocomp,setautocomp] = useState(0)
const [posts,setPosts] = useState(0)
const [tagload,settagload] = useState(0)
const [tagarray,settagarray] = useState([]);
const [matches,setmatches] = useState([]);

function autocompleter ()
{ setautocomp(0)
  if(searchValue == '') 
  {
    return;
  }
  if(!tagload && searchOption =='tag' ){
     axios.get('http://localhost:5000/tags',{}).then((res)=>
   {
       settagload(1)
      settagarray(res.data.tags);
       let temp = tagarray.filter((tag)=>
      {
        const regex = new RegExp(`${searchValue}`,'gi');
        return tag.tag_name.match(regex);
      }); console.log(temp)
      setmatches(temp)
      setautocomp(1)

   }).catch((err)=>
   {
       console.log(err)
   })
  }
  else if(tagload && searchOption=='tag')
   {  
     let temp = tagarray.filter((tag)=>
    {
      const regex = new RegExp(`${searchValue}`,'gi');
      return tag.tag_name.match(regex);
    }); console.log(temp)
    setmatches(temp)
     setautocomp(1)
   }
  else if(searchOption=='username')
   {

   }
   else
   {

   }
  

}

useEffect(()=>
{
autocompleter();
},[searchValue]);

const handleSearch = (e)=>
{
   
}

    return(

        <div >

          <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
					<input className="text-base text-gray-400 flex-grow outline-none px-2 " type="text" placeholder="Search" 
          onChange={(e)=>{setSearchValue(e.target.value,); }}/>
          {!!autocomp && <Autocomplete tags={matches} searchOption={searchOption}/>}
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<select  className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
            onChange={(e)=>setSearchOption(e.target.value)}>
            <option value="tag" selected>tag</option>
            <option value="username">username</option>
            <option value="multiple_tags">multiple tags</option>
          </select>
						<button clasName="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin" onClick={handleSearch}>Search</button>
					</div>
				</div>
           {!!posts && <DisplayPosts/>}
        </div>
    )
}

export default Posts;