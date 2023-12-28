import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const dispatch = useNotificationDispatch()
  const [visible, setVisible] = useState(false)
  const showWhenOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const queryClient = useQueryClient()
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteObject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })
  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const handleDelete = (event) => {
    event.preventDefault()
    try {
      deleteBlogMutation.mutate(blog.id)
      dispatch({
        type: 'SHOW',
        payload: {
          class: 'notification',
          message: `Blog '${blog.title}' deleted`
        }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    } catch (exception) {
      dispatch({
        type: 'SHOW',
        payload: { class: 'error', message: 'Deletion failed' }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  }

  const handleLike = (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
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
