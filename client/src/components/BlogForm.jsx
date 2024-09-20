
import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationDisplay } from '../reducers/notificationReducer'
import Toggable from './Toggable'
const BlogForm = (  ) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const[title, setTitleChange] = useState('')
  const [author, setAuthorChange] = useState('')
  const [url, setUrlChange] = useState('')

  const newBlog = (event) => {
    event.preventDefault()
    const blogtoAdd ={
      title: title,
      author: author,
      url: url,
    }
    console.log(blogtoAdd)
    dispatch(createBlog(blogtoAdd))
    dispatch(notificationDisplay(`New blog created successfully title ${title} from this author ${ author}`, 5))
    // saveBlog(blogtoAdd)
    setTitleChange('')
    setAuthorChange('')
    setUrlChange('')
    blogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <Toggable buttonLabel="New Blog" ref={blogFormRef}>
        <h1>Create New</h1>
        <form onSubmit={newBlog}>
          <div>
        Title:
            <input type="text"  value={title} data-testid="title-input" name="title" onChange={event => setTitleChange(event.target.value)}/>
          </div>
          <div>
        Author:
            <input type="text"  value={author} data-testid="author-input" name="Author" onChange={event => setAuthorChange(event.target.value)}/>
          </div>
          <div>
        Url:
            <input type="text" value={url} data-testid="url-input" name="Url" onChange={event => setUrlChange(event.target.value)}/>
          </div>
          <p>
            <button type= "submit" data-testid="create-button">Create</button>
          </p>
        </form>
      </Toggable>
    </div>
  )
}

export default BlogForm