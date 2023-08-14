import './NavBar.css'

export default function NavBar({ setPage, setCurrentArticle, user, setUser }){

   function handleChange(e){
        setCurrentArticle(null)
        setPage(e.target.name)
    }

    function handleLogout(){
        setUser(false)
    }

    return (
        <div className="flex bg-slate-950 font-sans spaceBetween text-xl">
            <div className="homeBtnDiv p-8">
                <button className="text-white hover:text-zinc-200 mr-6 font-sans"
                 name="null" onClick={handleChange}>Home</button>
            </div>
            <div className="buttonDiv flex text-xl text-white">
                <button name="index" onClick={handleChange} className=" hover:text-zinc-200 mr-6" >Explore Page</button>
                <button name="postform" onClick={handleChange} className=" hover:text-zinc-200 mr-6" >Make Post</button>
                <button name="feed" onClick={handleChange} className=" hover:text-zinc-200 mr-6" >Newsfeed</button>
                &nbsp; | &nbsp;
                &nbsp; &nbsp;
             
                <button onClick={handleLogout} className=" hover:text-zinc-200 mr-6">
                Logout, {user.username}
                </button>
            </div>
        </div>
    )
}