import { useState } from 'react';
import './HomePage.css';
import '../../index.css';
import UpdateProfile from '../../UpdateProfile/UpdateProfile'

export default function HomePage({ setPage, user, posts, setCurrentArticle, handleEditUser}) {
  const [nav, setNav] = useState({});
  const [editMode, setEditMode] = useState(false)
  console.log(user)
  function handleClick(e) {
    setPage(e.target.name);
  }

  const newsData = ['bennett', 'cat']

  let picture = ""

  if(user.img === ""){
    picture = "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"
  } else {
    picture = user.img
  }

  const userPosts = posts.filter(p => p.creatorId === user._id).toReversed()


  function handleChange(e){
    console.log(e.target.name)
    setCurrentArticle(e.target.name)
    setPage("index")
}

function handleEdit(e){
setEditMode(true)
}

if(!editMode){

  return (
    <>
      <div className="p-8 bg-slate-200 rounded mx-auto mt-20 max-w-[80vmin] px-4 md:px-8 2xl:px-16 md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
        
        <div className="flex mb-3">
          <img className="profilePicture mr-5" src={picture}></img>

          <div className="flex-col">
            <h1 className="userName">{user.firstName} {user.lastName}</h1>
            <h1>{user.about}</h1>
            <button className="rounded-full mb-5 mt-3 font-sans text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-sky-500 text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 text-sm lg:text-base w-full sm:w-auto" name={user._id} onClick={handleEdit}>Edit Profile</button>
          
          </div>
          
        </div>

       
        
        <div>
        { userPosts.map((p, idx) => (

                <>
                <div className="hover:bg-blue-300 border-blue-300 border-2 rounded p-3 mb-1">
                   
                    <div>
                    <div className="flex spaceBetween">
                        <div className="flex-col">
                          <div>
                          <img className="mini-pic block" src={user.img !== "" ? user.img : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}></img>
                          </div>
                            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading mb-1 ">
                                {user.firstName} {user.lastName}
                                
                            </h4>
                            <span className="font-light">{ 
                                p.updatedAt.slice(0, 10) ? p.createdAt.slice(0, 10) : p.updatedAt.slice(0, 10)
                                }
                            </span>
                        </div>
                        <div className="max-width">
                            <img className="max-h-30 rounded mb-5 " src={p.img} /> 
                        </div>
                    </div>

                    <button className="mt-3 mr-2 rounded-full text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 text-sm lg:text-base w-full sm:w-auto"
                    name={p._id} onClick={handleChange}>Click to Read More</button>

                    </div>
                   
                </div>

                </>
                ))}
        </div>
      </div>
  
    </>
  );
    } else if(editMode) {
      return (<UpdateProfile user={user} handleEditUser={handleEditUser} setEditMode={setEditMode}/>)
    }
}
