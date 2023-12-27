import { useQuery } from '@tanstack/react-query'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({ user }) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  // const deleteBlog = async (blogObject) => {
  //   try {
  //     if (window.confirm(`Delete blog '${blogObject.title}'`)) {
  //       await blogService.deleteObject(blogObject.id)
  //       setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
  //       dispatch({
  //         type: 'SHOW',
  //         payload: {
  //           class: 'notification',
  //           message: `Blog '${blogObject.title}' deleted`
  //         }
  //       })
  //       setTimeout(() => {
  //         dispatch({ type: 'HIDE' })
  //       }, 3000)
  //     }
  //   } catch (exception) {
  //     dispatch({
  //       type: 'SHOW',
  //       payload: { class: 'error', message: 'Deletion failed' }
  //     })
  //     setTimeout(() => {
  //       dispatch({ type: 'HIDE' })
  //     }, 3000)
  //   }
  // }

  // const updateBlog = async (id, blogObject) => {
  //   const updatedBlog = await blogService.update(id, blogObject)
  //   updatedBlog.user = { name: user.name, username: user.username }
  //   setBlogs(
  //     blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
  //   )
  // }

  if (result.isLoading) return null

  const blogs = result.data

  return (
    <div>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={() => console.log('Delete')}
            updateBlog={() => console.log('Update')}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
