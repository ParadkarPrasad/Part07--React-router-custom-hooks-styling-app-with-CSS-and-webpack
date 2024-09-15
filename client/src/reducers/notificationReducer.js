import { createSlice } from '@reduxjs/toolkit'
const initialState = ''


const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification:(state, action) => {
      return action.payload
    },
    hideNotification: (state, action) => {
      return ''
    }
  }
})

export const { addNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer