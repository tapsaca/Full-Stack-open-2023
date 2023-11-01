import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className='blog'>
      <div>{blog.title}, {blog.author} <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button></div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>{blog.likes} <button>Like</button></div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog