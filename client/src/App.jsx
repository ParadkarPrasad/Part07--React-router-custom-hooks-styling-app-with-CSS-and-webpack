import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { intializeBlog } from './reducers/blogReducer'
import { loggedInUser, logout } from './reducers/authReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationDisplay } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import DisplayAllBlogs from './components/DisplayAllBlogs'
import AllUsers from './components/AllUsers'
import SingleUserView from './components/SingleUserView'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
const App = () => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs)
  const user = useSelector(state => state.auth)
  // const [blogs, setBlogs] = useState([])
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  // const blogFormRef = useRef()
  useEffect(() => {
    // console.log('Dispatching intializeBlog')
    dispatch(intializeBlog())
  },[] )

  useEffect(() => {
    dispatch(loggedInUser())
  },[])
  useEffect(() => {
    dispatch(initializeUsers())
  }, [])
  // const notification = useSelector((state) => state.notification)


  const Home = () => {
    return (
      <>
        <h1>Blog Application</h1>
        <BlogForm/>
        <DisplayAllBlogs/>
      </>
    )
  }

  const AllBlogs = () => {
    return(
      <>
        <h2>Blogs</h2>
        <DisplayAllBlogs/>
      </>
    )
  }
  const handleLogout = () => {
    dispatch(logout())
    dispatch(notificationDisplay('Logout successful', 5))
  }

  // Create a new blog from UI
  // const handleCreate = async (blogObject) => {
  //   try{
  //     blogFormRef.current.toggleVisibility()
  //     const newBlog = await blogService.create(blogObject)
  //     //console.log(newBlog.author)
  //     // setBlogs(blogs.concat(newBlog))
  //     dispatch(notificationDisplay(`New blog created successfully title ${newBlog.title} from this author ${newBlog.author}`, 5))
  //     const getBlogs = await blogService.getAll()
  //     // setBlogs(getBlogs)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  // Update a Blog
  // const updateBlog = async (blogObject) => {
  //   try{
  //     const updatedBlog = await blogService.update(blogObject.id, blogObject)
  //     const newBlog = blogs.map((blog) => blog.id === updatedBlog.id?  updatedBlog : blog)
  //     // setBlogs(newBlog)
  //     dispatch(notificationDisplay(`Blog ${updatedBlog.title} by ${updatedBlog.author} updated `, 5))
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  // Delete Blog
  // const deleteBlog = async(id)  =>  {
  //   try{
  //     await blogService.deleteBlog(id)
  //     const newBlog = blogs.filter((blog) => blog.id !== id)
  //     // console.log(newBlog)
  //     // setBlogs(newBlog)
  //     // console.log(blogs)
  //     const getBlogs = await blogService.getAll()
  //     // setBlogs(getBlogs)
  //     dispatch(notificationDisplay('Blog deleted', 5))
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <h1>Login into application</h1>
  //     <div>
  //   username
  //       <input type="text" data-testid="username" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
  //     </div>
  //     <div>
  //   password
  //       <input type="password" data-testid="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
  //     </div>
  //     <button type="submit">login</button>
  //   </form>
  // )
  return (
    <div>
      <Notification/>
      {!user ? (
        <LoginForm/>
      ):(
        <div>
          {/* <h2>blogs</h2> */}
          {/* <button onClick={handleLogout}>logout</button> */}
          {/* <Toggable buttonLabel="New Blog" ref={blogFormRef}> */}
          {/* <BlogForm blogFormRef = {blogFormRef}/> */}
          {/* <BlogForm/> */}
          {/* </Toggable> */}
          {/* {[...blog].sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} username={user.username} />
          )} */}
          {/* <DisplayAllBlogs/> */}
          <Router>
            {user.username ? <> <p>{user.name} has logged in </p>
              <button onClick={handleLogout}>logout</button></> : <Link to = "/login">login</Link>}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={user.username ? <Home/> : <LoginForm/>}/>
              <Route path="/blogs" element={<AllBlogs />} />
              <Route path="/users" element={<AllUsers />} />
              <Route path="/users/:id" element={<SingleUserView />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  )
}

export default App