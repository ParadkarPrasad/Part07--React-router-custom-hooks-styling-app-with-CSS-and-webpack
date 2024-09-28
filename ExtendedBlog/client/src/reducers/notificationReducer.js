import { createSlice } from '@reduxjs/toolkit'
const initialState = ''


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification:(state, action) => {
      // console.log('Adding notification:', action.payload)
      return action.payload
    },
    hideNotification: (state, action) => {
      // console.log('Hiding notification')
      return ''
    }
  }
})
export const notificationDisplay = (content, time) => {
  return dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, time * 1000)
  }
}
export const { addNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer