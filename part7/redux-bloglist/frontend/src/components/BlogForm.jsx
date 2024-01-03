import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { StyledButton, StyledForm, StyledInput } from './styles'
import Togglable from './Togglable'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

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
      dispatch(createBlog(blog, user))
      dispatch(
        setNotification({
          class: 'notification',
          message: `Blog '${blog.title}' added`
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          class: 'error',
          message: 'Adding a new blog failed'
        })
      )
    }
  }

  return (
    <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
      <div>
        <h2>Create a new blog</h2>
        <StyledForm onSubmit={handleSubmit}>
          <div>
            Title
            <StyledInput name="title" />
          </div>
          <div>
            Author
            <StyledInput name="author" />
          </div>
          <div>
            URL
            <StyledInput name="url" />
          </div>
          <StyledButton type="submit">Save</StyledButton>
        </StyledForm>
      </div>
    </Togglable>
  )
}

export default BlogForm
