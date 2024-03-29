import { useState } from 'react'

const Blog = ({ blog, deleteBlog, updateBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const showWhenOwner = { display: user.username === blog.user.username ? '' : 'none' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const addLike = (event) => {
    event.preventDefault()
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    })
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div>{blog.title}, {blog.author} <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button></div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={addLike}>Like</button></div>
        <div>{blog.user.name}</div>
        <div style={showWhenOwner}>
          <button onClick={() => deleteBlog(blog)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog