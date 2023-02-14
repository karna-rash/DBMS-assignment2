import { useState } from "react";


function Posts(props)
{

const handleSearch = (e)=>
{
    
}

    return(

        <div>

<div class="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
					<input class="text-base text-gray-400 flex-grow outline-none px-2 " type="text" placeholder="Search" />
					<div class="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
						<select id="Com" class="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg">
            <option value="tag" selected>tag</option>
            <option value="user_id">user_id</option>
            <option value="multiple tags">multiple tags</option>
          </select>
						<button class="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin" onClick={handleSearch}>Search</button>
					</div>
				</div>
           
        </div>
    )
}

export default Posts;