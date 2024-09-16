
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { createBlog } from '../reducers/blogReducer'
const BlogForm = ({ saveBlog }) => {
  // const dispatch = useDispatch()
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
    // console.log(blogtoAdd)
    // dispatch(createBlog(blogtoAdd))
    saveBlog(blogtoAdd)
    setTitleChange('')
    setAuthorChange('')
    setUrlChange('')
  }
  return (
    <div>
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
    </div>
  )
}

export default BlogForm