import { useState } from "react";
import DisplayPosts from "./DisplayPosts";
import Autocomplete from './Autocomplete';
import axios from 'axios'
function Posts(props)
{
const [searchValue,setSearchValue] = useState('');
const [searchOption,setSearchOption] = useState('');
const [autocomp,setautocomp] = useState(0)
const [posts,setPosts] = useState(0)
const [tagload,settagload] = useState(0)

const autocompleter = ()=>
{
  if(!tagload){
     axios.get('http://localhost:5000/tags',{}).then((res)=>
   {
       settagload(1)
       
   }).catch((err)=>
   {

   })
  }

}

const handleSearch = (e)=>
{
   
}

    return(

        <div >

          <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
					<input className="text-base text-gray-400 flex-grow outline-none px-2 " type="text" placeholder="Search" 
          onChange={(e)=>{setSearchValue(e.target.value); autocompleter()}}/>
          {!!autocomp && <Autocomplete/>}
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<select  className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
            onChange={(e)=>setSearchOption(e.target.value)}>
            <option value="tag" selected>tag</option>
            <option value="user_id">user_id</option>
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