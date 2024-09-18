import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'
import Notification from './components/Notification'
// import notificationReducer from './reducers/notificationReducer'
// const store = createStore(notificationReducer)
import { intializeBlog } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notificationDisplay } from './reducers/notificationReducer'
const App = () => {
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs)
  // console.log(blog)
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  useEffect(() => {
    // console.log('Dispatching intializeBlog')
    dispatch(intializeBlog())
  },[] )
  //console.log('Blogs in component:', blog)
  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedBlogUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  // const notification = useSelector((state) => state.notification)
  // console.log(notification)
  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login( { username, password } )
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(notificationDisplay('Login successful', 5))
    }catch(exception){
      console.error(exception)
      dispatch(notificationDisplay('wrong username or password', 10))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
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
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h1>Login into application</h1>
      <div>
    username
        <input type="text" data-testid="username" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
    password
        <input type="password" data-testid="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
  return (
    <div>
      <Notification/>
      {!user ? (
        loginForm()
      ):(
        <div>
          <h2>blogs</h2>
          <button onClick={handleLogout}>logout</button>
          <Toggable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm blogFormRef = {blogFormRef}/>
          </Toggable>
          {[...blog].sort((a,b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blog={blog} username={user.username} />
          )}
        </div>
      )}
    </div>
  )
}

export default App