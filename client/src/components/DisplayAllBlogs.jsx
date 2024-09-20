import { useSelector } from 'react-redux'
import Blog from './Blog'


const DisplayAllBlogs = () => {
  const blog = useSelector(state => state.blogs)
  return (
    <>
      {[...blog].sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )
}

export default DisplayAllBlogs