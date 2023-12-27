import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import Togglable from './Togglable'
import { useNotificationDispatch } from '../NotificationContext'
import blogService from '../services/blogs'

const BlogForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const blogFormRef = useRef()

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    blogFormRef.current.toggleVisibility()
    try {
      newBlogMutation.mutate(blog)
      dispatch({
        type: 'SHOW',
        payload: {
          class: 'notification',
          message: `Blog '${blog.title}' added`
        }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    } catch (exception) {
      dispatch({
        type: 'SHOW',
        payload: { class: 'error', message: 'Adding a new blog failed' }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  }

  return (
    <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
      <div>
        <h2>Create a new blog</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Title <input name="title" />
          </div>
          <div>
            Author <input name="author" />
          </div>
          <div>
            URL <input name="url" />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
