import { useEffect, useState } from "react";
import DisplayPosts from "./DisplayPosts";
import axios from "axios";
function Posts(props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchOption, setSearchOption] = useState("tag");
  const [autocomp, setautocomp] = useState(0);
  const [postsReady, setPostsReady] = useState(0);
  const [tagload, settagload] = useState(0);
  const [tagarray, settagarray] = useState([]);
  const [matches, setmatches] = useState([]);
  const [posts,setPosts] = useState([]);
  const [pages,setPages] = useState(0);

  function handleClick(e) {
    let search_bar = document.getElementById("search-bar");
    search_bar.value = e.target.value;
    setSearchValue(e.target.value);
  }

  function autocompleter() {
    setautocomp(0);
    if (searchValue == "") {
      return;
    }
    if (!tagload && searchOption == "tag") {
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
    } else if (tagload && searchOption == "tag") {
      let temp = tagarray.filter((tag) => {
        const regex = new RegExp(`${searchValue}`, "gi");
        return tag.tag_name.match(regex);
      });
      setmatches(temp);
      setautocomp(1);
    } else if (searchOption == "username") 
    {
    } 
    else
    {
    }
  }

  useEffect(() => {
    autocompleter();
  }, [searchValue]);

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchOption=='tag')
    {
      axios.get('http://localhost:5000/posts/tag/'+searchValue,{}).
      then(async (res)=>
      {
           setPosts(res.data.posts)
           setPages(res.data.totpage) 
          
      }).catch((err)=>
      {
           console.log(err);
      })
    }
  };

  useEffect(()=>
  {
     if(posts.length>0) setPostsReady(1)
     console.log(posts,' ',pages)
  },[posts]);

  return (
    <div className="flex min-h-screen justify-center from-blue-500 to-emerald-500 bg-gradient-115">
      <div className="container mx-auto">
      <div className="translate-y-7">
        <div className="relative w-150 ">
          <form>
            <div className="flex justify-between overflow-hidden rounded-t-lg bg-white shadow">
              <input
                id="search-bar"
                className="text-base text-gray-400 flex-grow outline-none px-4 py-3"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />

              <div class="flex flex-row items-center px-1 rounded-lg mx-auto ">
                <select
                  className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
                  onChange={(e) => setSearchOption(e.target.value)}
                >
                  <option value="tag" selected>
                    tag
                  </option>
                  <option value="username">username</option>
                  <option value="multiple_tags">multiple tags</option>
                </select>

                <button
                  onClick={handleSearch}
                >
                  <span class="m-1 inline-flex cursor-pointer items-center rounded-md bg-indigo-600 px-2 py-2 hover:bg-indigo-700">
                    <svg
                      class="text-white"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M21.07 16.83L19 14.71a3.08 3.08 0 0 0-3.4-.57l-.9-.9a7 7 0 1 0-1.41 1.41l.89.89a3 3 0 0 0 .53 3.46l2.12 2.12a3 3 0 0 0 4.24 0a3 3 0 0 0 0-4.29Zm-8.48-4.24a5 5 0 1 1 0-7.08a5 5 0 0 1 0 7.08Zm7.07 7.07a1 1 0 0 1-1.42 0l-2.12-2.12a1 1 0 0 1 0-1.42a1 1 0 0 1 1.42 0l2.12 2.12a1 1 0 0 1 0 1.42Z"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
            <div className="absolute mt-auto w-full overflow-hidden rounded-b-lg bg-white">
              {!!autocomp && (
                <div>
                  <div class="block appearance-none w-full bg-white border overflow-y-auto h-56  border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                    {matches.map((match) => (
                      <option key={match.id}
                        className="hover:text-blue-500 py-2"
                        onClick={(e) => {
                          handleClick(e);
                        }}
                      >
                        {match.tag_name}
                      </option>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div >
      <div className="translate-y-72">
      {!!postsReady && <DisplayPosts posts={posts} pages={pages} params={{searchOption:searchOption,searchValue:searchValue}}/>}
      </div>
    </div>
    </div>
  );
}

export default Posts;
