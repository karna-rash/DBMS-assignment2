const Loading = () => {
    return ( 
        <div className="flex justify-center items-center space x-2">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-600" role="status"></div>
            <span class="visually-hidden">Loading...</span>
        </div>
     );
}
 
export default Loading;