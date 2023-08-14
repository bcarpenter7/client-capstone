
import { useState } from 'react'
import EditPage from '../../EditPage/EditPage'
import './PostDetail.css'


export default function PostDetail({article, handleEdit, setPage, deletePost, handleDelete, setCurrentArticle, user}){
    console.log(article.content)
    
    
    console.log(user, "user")
    console.log(article, "article")

    const [editMode, setEditMode] = useState(false)

    function editPost(e){
        setEditMode(true)
    }

    function deletePost(e){
        if (window.confirm("Are you sure you want to delete this post?")) {
            handleDelete(e.target.name);
            setCurrentArticle(null)
            setEditMode(false)
            setPage("index")
          }
    }


    if(editMode === true){
    return (
        <EditPage article={article} handleEdit={handleEdit} setPage={setPage} setEditMode={setEditMode} setCurrentArticle={setCurrentArticle}/>
    ) 
    } else if(user._id === article.creatorId){
        return (
            <>
            
                
                <div className="p-8 bg-slate-200 rounded mx-auto mt-20 max-w-[80vmin] px-4 md:px-8 2xl:px-16 md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
                    <div className="mb-3">
                        <h1 className="text-2xl 2xl:text-3xl font-bold text-heading mb-3"> {user.firstName} {user.lastName} </h1>
                        <h3 className="block text-gray-600 font-semibold text-sm leading-none mb-3"> Published { article.updatedAt.slice(0, 10) ? article.createdAt.slice(0, 10) : article.updatedAt.slice(0, 10)}</h3>
                    
                    </div>
                    {/* <h3 className="block text-gray-600 font-semibold text-sm leading-none mb-3"> {article.author} </h3> */}
                    
                    <div>
                        <img className="max-width-2 mb-5" src={article.img} /> 
                    </div>
                    <div>
                        <p className="previewText mb-5">{article.content}</p>






                        <div className="flex spaceBetween">
                            <button className="rounded-full text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none bg-sky-500 text-white px-5 md:px-6 lg:px-6 py-4 md:py-3.5 lg:py-2 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                            name={article._id} onClick={editPost}>Click to edit</button>

                            <button className="rounded-full text-[13px] md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-body text-center justify-center border-0 border-transparent placeholder-white focus-visible:outline-none focus:outline-none  bg-red-500 text-white px-5 md:px-6 lg:px-6 py-4 md:py-3.5 lg:py-2 hover:text-white hover:bg-gray-600 hover:shadow-cart h-12 lg:h-14 mt-1 text-sm lg:text-base w-full sm:w-auto"
                            name={article._id} onClick={deletePost}>Click to delete</button>
                        </div>
                     
                    </div>
                </div>
    
            </>
    
        )
    }
    
    
    else {
        return (
            <>
            
                
                <div className="p-8 bg-slate-200 rounded mx-auto mt-20 max-w-[80vmin] px-4 md:px-8 2xl:px-16 md:w-full lg:w-3/5 2xl:w-4/6 flex h-full ltr:md:ml-7 rtl:md:mr-7 flex-col ltr:lg:pl-7 rtl:lg:pr-7">
                    <div className="mb-3">
                        <h1 className="text-2xl 2xl:text-3xl font-bold text-heading mb-3"> {user.firstName} {user.lastName} </h1>
                        <h3 className="block text-gray-600 font-semibold text-sm leading-none mb-3"> Published { article.updatedAt.slice(0, 10) ? article.createdAt.slice(0, 10) : article.updatedAt.slice(0, 10)}</h3>
                    
                    </div>

                    <div>
                        <img className="max-width-2 mb-5" src={article.img} /> 
                    </div>
                    <div>
                        <p className="previewText mb-5">{article.content}</p>

                     
                    </div>
                </div>
    
            </>
    
        )
    }
}