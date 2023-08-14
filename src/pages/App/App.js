import { useState, useEffect } from 'react'
import axios from 'axios'
import Post from '../../components/Post/Post'
// import Add from './components/Add'
// import Edit from './components/Edit'
import PostForm from '../../components/PostForm/PostForm'
import { Routes, Route } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import HomePage from '../HomePage/HomePage'
import PostDetail from '../../components/PostDetail/PostDetail'
import LoginPage from '../../components/LoginPage/LoginPage'
import RegisterPage from '../../components/RegisterPage/RegisterPage'
import Feed from '../../components/Feed/Feed'


export default function App() {
  const [posts, setPosts] = useState([])
  const [currentArticle, setCurrentArticle] = useState(null)
  const [page, setPage] = useState(null)
  const [user, setUser] = useState(false)
  const [allUsers, setAllUsers] = useState(null)


  // POSTS
  async function getPosts(){
    try {
      const res = await axios.get('http://localhost:3000/api/posts')
      setPosts(res.data)
    } catch (err){
      console.error(err)
    }
  }


  const handleCreate = (createdPost) => {
    axios.post('http://localhost:3000/api/posts', createdPost)
      .then((response) => {
        setPosts([...posts, response.data])
      })
  }


  const handleEdit = (editedPost) => {
    axios.put('http://localhost:3000/api/posts/' + editedPost._id, editedPost)
      .then((response) => {
        let newPost = posts.map((post) => {
          return post._id !== editedPost._id ? post : editedPost
        })
        setPosts(newPost)
      })
  }

  const handleDelete = (deletedPost) => {
    axios.delete('http://localhost:3000/api/posts/' + deletedPost)
      .then((response) => {
        let newPosts = posts.filter((post) => {
          return post._id !== deletedPost
        })
        setPosts(newPosts)
      })
  }

  // USERS
  async function getUsers(){
    try {
      const res = await axios.get('http://localhost:3000/api/users')
      setAllUsers(res.data)
    } catch (err){
      console.error(err)
    }
  }

  const handleCreateUser = (createdUser) => {
    axios.post('http://localhost:3000/api/users', createdUser)
      .then((response) => {
        setAllUsers([...allUsers, response.data])
      })
  }

  const handleEditUser = (editedUser) => {
    axios.put('http://localhost:3000/api/users/' + editedUser._id, editedUser)
      .then((response) => {
        let newUser = allUsers.map((user) => {
          
          return user._id !== editedUser._id ? user : editedUser
        })
        console.log(newUser, "newUser handleEdit")
        setAllUsers(newUser)
        setUser(editedUser)
      })
  }

  const handleDeleteUser = (deletedUser) => {
    axios.delete('http://localhost:3000/api/users/' + deletedUser)
      .then((response) => {
        let newUsers = allUsers.filter((user) => {
          return user._id !== deletedUser
        })
        setAllUsers(newUsers)
      })
  }

  useEffect(() => {
    getPosts()
   
  }, [])

  useEffect(() => {
    getUsers()
   
  }, [])


    if(user){
    if(page === null || page === "null"){
        return (
          <>
          <NavBar setPage={setPage} setCurrentArticle={setCurrentArticle} user={user} setUser={setUser}/>
         
              <Routes>
                <Route 
                    path="/" 
                    element={
                      <HomePage setPage={setPage} user={user} posts={posts} setCurrentArticle={setCurrentArticle} handleEditUser={handleEditUser}/>
                    }>

                </Route>
              </Routes>
          </>
        )
      }

      if(page === "index" || page === "indexUpdate"){
        return (
            <>
              <NavBar setPage={setPage} setCurrentArticle={setCurrentArticle} user={user} setUser={setUser}/>
              {/* <h1>All Posts</h1> */}
              <Routes>
                <Route 
                    path="/" 
                    element={
                      <Post 
                      posts={posts} 
                      currentArticle={currentArticle} 
                      setCurrentArticle={setCurrentArticle} 
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      setPage={setPage}
                      user={user}
                      allUsers={allUsers}
                      handleEditUser={handleEditUser}
                      />
                    }>

                </Route>
              </Routes>
            </>

        )
      }

      if(page === "feed" || page === "indexUpdate"){
        return (
            <>
              <NavBar setPage={setPage} setCurrentArticle={setCurrentArticle} user={user} setUser={setUser}/>
              {/* <h1>All Posts</h1> */}
              <Routes>
                <Route 
                    path="/" 
                    element={
                      <Feed 
                      posts={posts} 
                      currentArticle={currentArticle} 
                      setCurrentArticle={setCurrentArticle} 
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                      setPage={setPage}
                      user={user}
                      handleEditUser={handleEditUser}
                      allUsers={allUsers}
                      />
                    }>

                </Route>
              </Routes>
            </>

        )
      }

      if(page === "postform"){
        return (
            <>
              <NavBar setPage={setPage} setCurrentArticle={setCurrentArticle} user={user} setUser={setUser}/>
              {/* <h1>All Posts</h1> */}
              <Routes>
                <Route 
                    path="/" 
                    element={
                      <PostForm handleCreate={handleCreate} setPage={setPage} user={user}/>
                    }>

                </Route>
              </Routes>
            </>

        )
      }


      
    } else {
      return (
        <>
          <Routes>
            <Route 
                path="/" 
                element={
                  <>
                   {/* <LoginPage allUsers={allUsers} setUser={setUser}/> */}
                    <RegisterPage allUsers={allUsers} handleCreateUser={handleCreateUser} setUser={setUser}/>
                  </>
                 
                }>

            </Route>
          </Routes>
        </>

    )




    }
}
