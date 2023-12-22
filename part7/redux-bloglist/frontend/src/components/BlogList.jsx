import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  return (
    <div>
      <BlogForm user={user} />
      {blogs
        .slice()
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogList
