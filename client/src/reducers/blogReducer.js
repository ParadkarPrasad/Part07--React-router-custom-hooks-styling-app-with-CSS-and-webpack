import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action){
      return action.payload
    },
    appendBlog (state, action){
      state.push(action.payload)
    },
    removeBlog (state, action){
      return state.filter(blog => blog.id !== action.payload.id)
    },
    voteBlog (state, action){
      const id  = action.payload.id
      const blogToUpdate = action.payload
      return state.map((blog) => blog.id !== id ? blog: blogToUpdate)
    }
  }
})
export const { setBlog, appendBlog, removeBlog,voteBlog } = blogSlice.actions

// getting all the blogs from the server using Thunk
export const intializeBlog = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    console.log('Fetched blogs:', blogs)
    dispatch(setBlog(blogs))
  }
}

// create a new blog

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

// Update likes of the blog
export const updateLikes = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogsService.update(blog)
    dispatch(voteBlog(updatedBlog))
  }
}

// delete a blog
export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogsService.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}

export default  blogSlice.reducer