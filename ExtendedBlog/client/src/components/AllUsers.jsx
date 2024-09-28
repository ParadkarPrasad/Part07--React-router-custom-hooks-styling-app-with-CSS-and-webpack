import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const AllUsers = () => {
  const users = useSelector((state) => state.user)
  console.log(users)
  const dispatch =  useDispatch()
  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [])
  return (
    <>
      <h2 className='font-thin flex justify-center items-center'>Users</h2>
      <table className='table-auto border-collapse '>
        <thead>
          <tr>
            <th className='border border-slate-600 font-semibold px-2'>Username</th>
            <th className='border border-slate-600 font-semibold'>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <tr key = {user.id}>
            <td className='border border-slate-700'><Link className='font-thin' to ={`/users/${user.id}`}>{user.username}</Link> </td>
            <td className='border border-slate-700 font-thin'>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default AllUsers
// <Link to={`/notes/${note.id}`}>{note.content}</Link>