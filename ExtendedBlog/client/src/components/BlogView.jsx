import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { notificationDisplay } from '../reducers/notificationReducer'
import { updateLikes } from '../reducers/blogReducer'
import CommentDisplay  from './CommentDisplay'
const BlogView = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)
  // console.log(blogs.user.username)
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
      <p>{blog.likes}<button onClick={handleLike}>Update Likes</button></p>
      <p>Added by {blog.user !== null && blog.author}</p>
      <CommentDisplay id = {blog.id}/>
    </>
  )
}

export default BlogView