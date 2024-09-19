import { notificationDisplay } from './notificationReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: [],
  reducers: {
    initializeUser( state, action){
      return action.payload
    },
    loginUser(state, action){
      return action.payload
    },
    logoutUser(state, action){
      return null
    }
  }
})
export const { initializeUser, loginUser, logoutUser } = authSlice.actions

// Thunks

export const loggedInUser = () => {
  return async dispatch => {
    const savedUser = window.localStorage.getItem('loggedBlogUser')
    if(savedUser){
      const user = JSON.parse(savedUser)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login( { username, password } )
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(loginUser(user))
      dispatch(notificationDisplay('Login successful', 5))
    }
    catch(exception){
      console.log(exception)
      dispatch(notificationDisplay('wrong username or password', 10))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogUser')
    dispatch(logoutUser())
  }
}

export default authSlice.reducer