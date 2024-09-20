import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice =  createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions


// GetaLL Thunk

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(setUser(users))
  }
}
export default userSlice.reducer