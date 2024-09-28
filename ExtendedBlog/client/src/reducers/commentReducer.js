import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [{ id: 1 , content: 'Nice read' }, { id: 2, content: 'Nice info' } ],

  reducers: {
    setComment(state, action){
      return action.payload
    },
    addComment(state, action){
      state.push(action.payload)
    }
  }
})
export const { setComment,addComment } = commentSlice.actions

export const intializeAllComments = (id) => {
  return async dispatch => {
    const comments = await blogService.getComment(id)
    dispatch(setComment(comments))
  }
}

export const generateNewComment = ( id, content ) => {
  return async dispatch => {
    const comments = await blogService.createComment(id, content)
    dispatch(addComment(comments))
  }
}

export default commentSlice.reducer