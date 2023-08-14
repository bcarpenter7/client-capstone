
import '../../components/Post/Post.css'
import '../../index.css'
import { useState } from 'react'
import PostDetail from '../PostDetail/PostDetail' 

export default function Feed({ posts, currentArticle, allUsers, setCurrentArticle, handleDelete, handleEdit, setPage, user, handleEditUser}) {
    // const [currentArticle, setCurrentArticle] = useState("64c3e10928aa2fe7e8476947")
    const [temp, setTemp] = useState({
        username: user.username,
        password: user.password,
        friendsList: user.friendsList,
        img: user.img,
        firstName: user.firstName,
        lastName: user.lastName,
        posts: user.posts,
        about: user.about,
        _id: user._id
    })

    console.log(user, "USER", temp, "temp")

    function handleChange(e){
        console.log(e.target.name)
        setCurrentArticle(e.target.name)
    }

    function handleRemoveFriend(e){
        const indexOfRemove = temp.friendsList.indexOf(e.target.name)
        temp.friendsList.splice(indexOfRemove, 1)
        handleEditUser(temp)
    }
    // const friendFeed = posts.map((p) => user.friendList.includes(p._id))


    // function handleAddFriend(e){
    //     console.log(temp.friendsList, "friendsList")
    //     temp.friendsList.push(e.target.name)
    //     // setTemp({...temp, [temp.friendsList.p]: [...temp.friendsList, e.target.name]})
    //     console.log(temp.friendsList)
    // }
    console.log(temp.friendsList, "friendsList")
    const friendFeed = posts.filter((p) => user.friendsList.includes(String(p.creatorId))).toReversed()
    console.log(user.friendsList, user.friendsList.includes(Number(posts[0].creatorId)), posts[0].creatorId, 'test')
    console.log(friendFeed, "FRIEND FEED")


    if(currentArticle === null){
    return (
        <>
        <div className="p-8 bg-slate-200 rounded mx-auto mt-20 max-w-[80vmin] px-4 md:px-8 2xl:px-16 md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
        <h1 className='text-2xl 2xl:text-3xl font-bold text-heading mb-10 self-center'>Newsfeed</h1>
        { friendFeed.map((p, idx) => (

            <>
            <div className="hover:bg-blue-300 border-blue-300 border-2 rounded p-3 mb-1" >
            
                 <div>   
                    <div className="flex spaceBetween">
                        <div className="flex-col ">
                            
                        <img className="mini-pic" src={allUsers.find(e => e._id === p.creatorId).img !== "" ? allUsers.find(e => e._id === p.creatorId).img : "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60"}></img>
                            <h4 className="text-2xl 2xl:text-3xl font-bold text-heading mb-1 ">
                                {allUsers.find(e => e._id === p.creatorId) ? `${allUsers.find(e => e._id === p.creatorId).firstName} ${allUsers.find(e => e._id === p.creatorId).lastName}` : 'Unknown User'}
                                
                            </h4>
                            <span className="font-light">{ 
                                p.updatedAt.slice(0, 10) ? p.createdAt.slice(0, 10) : p.updatedAt.slice(0, 10)
                                }
                            </span>
                        </div>
                        <div className="max-width"> 
                            <img className="rounded mb-5" src={p.img} /> 
                        </div>
                    </div>
                    
                    <button className="mt-3 mr-2 rounded-full text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-black text-white px-5 md:px-6 lg:px-8 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 text-sm lg:text-base w-full sm:w-auto"
                    name={p._id} onClick={handleChange}>Click to Read More</button>
                    <button className="rounded-full text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-sky-500 text-white px-5 md:px-6 lg:px-6 py-4 md:py-3.5 lg:py-2 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                    name={p.creatorId} onClick={handleRemoveFriend}>Unfollow</button>
                 
                   
                </div>
               
            </div>

            </>
    ))}
    </div>
       </>
    )
        } else {
            const article = posts.find(p => p._id == currentArticle)
            return (
            <>      
               <PostDetail article={article} handleEdit={handleEdit} setPage={setPage} handleDelete={handleDelete} setCurrentArticle={setCurrentArticle} user={user}/>
            </>
            )
        }
}

