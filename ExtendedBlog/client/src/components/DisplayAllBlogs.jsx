import { useSelector } from 'react-redux'
import Blog from './Blog'


const DisplayAllBlogs = () => {
  const blog = useSelector(state => state.blogs)
  return (
    <div>
      <div className="">
        {[...blog].sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog className="font-semibold p-5" key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default DisplayAllBlogs