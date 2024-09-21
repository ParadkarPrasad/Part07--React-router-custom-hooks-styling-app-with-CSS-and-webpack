import { useState } from 'react'
import { updateLikes, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { notificationDisplay } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, username }) => {
  // console.log(blog.id)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  // const handleLikes = () => {
  //   const blogToUpdate = ({
  //     ...blog,
  //     user: blog.user.id,
  //     likes: blog.likes + 1
  //   })
  //   // console.log(blogToUpdate)
  //   dispatch(updateLikes(blogToUpdate))
  //   dispatch(notificationDisplay(`Blog ${blog.title} updated by ${blog.author} `, 5))
  // }

  // const handleDelete= () => {
  //   if(window.confirm('Are you sure you want to delete this blog?')){
  //     dispatch(deleteBlog(blog.id))
  //     dispatch(notificationDisplay(`Blog ${blog.title} deleted by ${blog.author}`, 10))
  //   }
  // }
  return(
    <div style={blogStyle} className='blog' >
      {/* <div >
        <span>{blog.title} </span>
        <span>{blog.author} </span>
        <button data-testid="toggle-visibility" onClick={() => setVisible(!visible)}>
          {visible? 'hide': 'view'}
        </button>
      </div> */}

      {/* { visible === true && ( */}
      {/* <div>
          <a href= {blog.url}>{blog.url}</a>
          <div data-testid="blog-details">
            <span>likes {blog.likes}</span>
            <button onClick={handleLikes} data-testid="like-button">likes</button>
          </div>

          <span>{blog.user.name}</span> */}

      {/* {blog.user.username === username && ( */}
      {/* <div>
            <button onClick={handleDelete}>remove</button>
          </div> */}
      {/* )} */}
      {/* </div> */}
      {/* ) } */}
      <Link to={`/blogs/${blog.id}`}>{blog.title}{blog.author}</Link>
    </div>
  )}
export default Blog
