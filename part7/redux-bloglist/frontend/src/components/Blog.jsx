import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)
  const showWhenOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const handleDelete = (event) => {
    event.preventDefault()
    event.preventDefault()
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(
        setNotification({
          class: 'notification',
          message: `Blog '${blog.title}' deleted`
        })
      )
    } catch (exception) {
      dispatch(setNotification({ class: 'error', message: 'Deletion failed' }))
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className="blog">
      <div>
        {blog.title}, {blog.author}{' '}
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>Like</button>
        </div>
        <div>{blog.user.name}</div>
        <div style={showWhenOwner}>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
