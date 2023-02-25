import showdown from 'showdown'
import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react';
import Posts from './Posts';
import { useEffect} from "react";
import axios from "axios";
//import { useAuthContext } from '../hooks/useAuthContext';

const Createpost = () => {
   // const { user }=useAuthContext() 
    const [body, setBody] = useState("**Hello world!!!**");
    const [title,settitle]=useState();
    const [multytag,setMultytag] = useState([]);
    const [autocomp, setautocomp] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [tagload, settagload] = useState(0);
    const [tagarray, settagarray] = useState([]);
    const [matches, setmatches] = useState([]);
    const [yvalue, setyvalue] = useState(28);
   // console.log(user)
    //const Ownername=user;

    function handleClick(e) {
        if (multytag.length == 5) {
          alert("A post cannot have more than five tags.");
        } else {
          let arr = multytag;
          if (!arr.includes(e.target.value)) {
            arr.push(e.target.value);
            let search_bar = document.getElementById("search-bar");
            search_bar.value = "";
            setSearchValue("");
            setMultytag([...arr]);
          } else {
            alert("This tag is already selected!");
          }
        }
    }

    function autocompleter() {
      setautocomp(0);
      if (searchValue == "") {
        return;
      }
      if (
        !tagload
      ) {
        axios
          .get("http://localhost:5000/tags", {})
          .then((res) => {
            settagload(1);
            settagarray(res.data.tags);
            let temp = tagarray.filter((tag) => {
              const regex = new RegExp(`${searchValue}`, "gi");
              return tag.tag_name.match(regex);
            });
            setmatches(temp);
            setautocomp(1);
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (
        tagload
      ) {
        let temp = tagarray.filter((tag) => {
          const regex = new RegExp(`${searchValue}`, "gi");
          return tag.tag_name.match(regex);
        });
        setmatches(temp);
        setautocomp(1);
      }
    }
  
    useEffect(() => {
      setyvalue(80);
      autocompleter();
      if (searchValue == "") {
        setyvalue(32);
      }
    }, [searchValue]);


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
      tags:multytag
     })
     .then((res)=>
     {
             if(res.tokenStatus == 1)
             {
              
             }
     }).catch((err)=>
     {

     }) 

    }

    function removeTag(e) {
      e.preventDefault();
  
      let ind = e.target.getAttribute("ind");
  
      let arr = multytag;
      arr.splice(ind, 1);
  
      setMultytag([...arr]);
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
        <div className="flex w-1/2 justify-between overflow-hidden rounded-t-lg bg-white shadow">
              <input
                id="search-bar"
                className="text-base text-gray-400 flex-grow outline-none px-4 py-3"
                type="text"
                placeholder="Search Tag"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
          </div>
          <div className="mt-auto w-full overflow-hidden rounded-b-lg bg-white">
                {!!autocomp && (
                  <div>
                    <div class=" appearance-none w-full block bg-white border overflow-y-auto h-56  border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                      {matches.map((match) => (
                        <option
                          key={match.id}
                          className="hover:text-blue-500 py-2"
                          onClick={(e) => {
                            handleClick(e);
                          }}
                        >
                          { match.tag_name}
                        </option>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-row">
                  {multytag.map((tag, index) => (
                    <div
                      className="mx-4 bg-gray-400 rounded-lg mt-2"
                      key={index}
                    >
                      &nbsp;{tag}
                      <button className="text-red-500" onClick={removeTag}>
                        <span
                          class="m-1 inline-flex cursor-pointer items-center rounded-md bg-red-600 px-2 py-2 hover:bg-red-700"
                          ind={index}
                        >
                          <svg
                            width="12px"
                            height="12px"
                            viewBox="0 0 24 24"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-labelledby="removeIconTitle"
                            stroke="#000000"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            fill="none"
                            color="#000000"
                          >
                            {" "}
                            <title id="removeIconTitle">Remove</title>{" "}
                            <path d="M17,12 L7,12" />{" "}
                            <circle cx="12" cy="12" r="10" />{" "}
                          </svg>
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
      <button className="bg-slate-200 hover:bg-sky-500 rounded px-4 py-2 w-auto">Submit</button>

          </form>
               
        </div>
         </div>
    );
}
 
export default Createpost;