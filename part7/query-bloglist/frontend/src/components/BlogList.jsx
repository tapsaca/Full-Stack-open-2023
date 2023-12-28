import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  if (result.isLoading) return null

  const blogs = result.data

  return (
    <div>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default BlogList
