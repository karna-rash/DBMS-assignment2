import { useLocation } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
function Post() {
  const location = useLocation();
  const post = location.state.post;
  const date1 = new Date(post.creation_date);
  const date2 = new Date(post.last_modified);

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

  return (
    <div className="relative flex flex-col justify-center min-h-screen from-red-500 to-blue-500 bg-gradient-115 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
          <div className="text-center text-3xl mt-2 mb-2">{post.title}</div>
          <div className="flex flex-row">
            <div className="text-left mx-8 mb-2">Asked:{difference(date1)}</div>
            <div className="text-right mx-8 mb-2">
              Modified:{difference(date2)}
            </div>
          </div>
          <div className="text-left mx-8 border-2 border-black">
            <div className="mx-4 my-4 [&>pre]:prefg ">{parse(post.body)}</div>
          </div>
          <div className="text-center">
          <button className="bg-indigo-500 text-white py-2 px-16 rounded-lg hover:bg-indigo-600">See Answers</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
