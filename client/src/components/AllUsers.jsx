import { useSelector } from 'react-redux'
import Blog from './Blog'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
const AllUsers = () => {
  const users = useSelector((state) => state.user)
  // console.log(users)
  const dispatch =  useDispatch()
  // useEffect(() => {
  //   dispatch(initializeUsers())
  // }, [])
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blog Count</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => <tr key = {user.id}>
            <td><Link to ={`/users/${user.id}`}>{user.username}</Link> </td>
            <td>{user.blogs.length}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default AllUsers
// <Link to={`/notes/${note.id}`}>{note.content}</Link>