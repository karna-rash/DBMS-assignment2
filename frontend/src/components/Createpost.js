import MDEditor from '@uiw/react-md-editor'
import { useState } from 'react';

const Createpost = () => {
    const [value, setValue] = useState("**Hello world!!!**");
    return (
      <div className="relative flex flex-col justify-center min-h-screen from-red-500 to-blue-500 bg-gradient-115 overflow-hidden">
        <div className="flex flex-col bg-white ">
          <h1 className="text-3x1 text-center">Create Post</h1>
        <MDEditor
          value={value}
          onChange={setValue}
          className="mx-4 my-4"
        />
     
        </div>
         </div>
    );
}
 
export default Createpost;