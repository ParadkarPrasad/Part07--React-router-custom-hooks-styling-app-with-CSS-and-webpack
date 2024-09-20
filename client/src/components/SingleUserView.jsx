import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'


const SingleUserView = () => {
  const user = useSelector((state) => state.user)
  console.log(user)
  const id = useParams().id

  const singleUser = user.find((n) => n.id === String(id))
  // console.log(singleUser)
  if (!singleUser) {
    return null
  }
  return (
    <div>
      <h2>{singleUser.username}</h2>
      <h3>added blogs: </h3>
      <ul>
        {singleUser.blogs.map(blog => <li key= {blog.id}>{blog.title}</li> )}
      </ul>
    </div>
  )
}

export default SingleUserView

//          <Link to={`/notes/${note.id}`}>{note.content}</Link>
