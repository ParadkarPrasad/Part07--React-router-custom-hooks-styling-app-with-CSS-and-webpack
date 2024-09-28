import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'
// import { notificationDisplay } from '../reducers/notificationReducer'
const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(login(username, password))
    setUsername('')
    setPassword('')
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <form className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md' onSubmit={handleLogin} >
        <h1 className='text-2xl font-bold mb-6 text-center'>Login to Application</h1>
        <div className='mb-4'>
          <label className="block text-sm font-medium text-gray-700" htmlFor="username">
          Username:
          </label>
          <input className='mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500' type="text" data-testid="username" value={username} name="username" onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          <label htmlFor="password">
            Password:
          </label>
          <input className='mt-1 mb-4 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500' type="password" data-testid="password" value={password} name="password" onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"type="submit">login</button>
      </form>
    </div>
  )
}
export default LoginForm