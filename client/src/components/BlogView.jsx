import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { notificationDisplay } from '../reducers/notificationReducer'
import { updateLikes } from '../reducers/blogReducer'

const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  // console.log(blogs)
  const id = useParams().id
  const blog = blogs.find(n => n.id === String(id))
  // console.log(blog)
  if(!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(updateLikes(blog))
    dispatch(notificationDisplay(`Liked the following blog with title ${blog.title} from author ${blog.author}`))
  }
  return (
    <>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes}<button onClick={handleLike}>Remove</button></p>
      <p>Added by {blog.user !== null && blog.user.username}</p>
    </>
  )
}

export default BlogView