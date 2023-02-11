const Login = () => {
    return ( 
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-orange-300 border-0 rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-center text-3x1 font-semibold text-black ">Log in</h1>


                <form className="mt-6 ">
                    <div className="mb-2 content-center">
                    <label className="block text-sm font-semibold text-black">
                        EMAIL
                    </label >
                    <input className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    </input>

                    <label className="block text-sm font-semibold text-black">
                        PASSWORD
                    </label>
                    <input className="block w-full px-4 py-2 mt-2 textblack bg-white border rounded-md focus:border-rose-400 focus:ring-rose-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    </input>

                    
                    </div>
                    <br></br>
                    <button className="bg-slate-200 hover:bg-sky-500 rounded px-4 py-2 w-full">Login</button>
                </form>
            </div>

        </div>
     );
}
 
export default Login;