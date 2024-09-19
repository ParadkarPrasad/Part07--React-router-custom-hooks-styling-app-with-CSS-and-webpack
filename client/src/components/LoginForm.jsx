import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
import { notificationDisplay } from './reducers/notificationReducer'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
    dispatch(notificationDisplay('Login successful', 5))
  }
  return (
    <form onSubmit={handleLogin}>
      <h1>Login into application</h1>
      <div>
      username
        <input type="text" data-testid="username" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
      password
        <input type="password" data-testid="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>
  )
}
export default LoginForm