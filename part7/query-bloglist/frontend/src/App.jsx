import { useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './NotificationContext'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useNotificationDispatch()
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
    }
  }, [])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const addedBlog = await blogService.create(blogObject)
      addedBlog.user = { name: user.name, username: user.username }
      setBlogs(blogs.concat(addedBlog))
      dispatch({
        type: 'SHOW',
        payload: {
          class: 'notification',
          message: `Blog '${blogObject.title}' added`
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

  const deleteBlog = async (blogObject) => {
    try {
      if (window.confirm(`Delete blog '${blogObject.title}'`)) {
        await blogService.deleteObject(blogObject.id)
        setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
        dispatch({
          type: 'SHOW',
          payload: {
            class: 'notification',
            message: `Blog '${blogObject.title}' deleted`
          }
        })
        setTimeout(() => {
          dispatch({ type: 'HIDE' })
        }, 3000)
      }
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      dispatch({
        type: 'SHOW',
        payload: {
          class: 'notification',
          message: `Hello ${loggedUser.name}`
        }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    } catch (exception) {
      dispatch({
        type: 'SHOW',
        payload: { class: 'error', message: 'Login failed' }
      })
      setTimeout(() => {
        dispatch({ type: 'HIDE' })
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const updateBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    updatedBlog.user = { name: user.name, username: user.username }
    setBlogs(
      blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Login to BlogList</h1>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <div>
        <p>User: {user.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((b1, b2) => b2.likes - b1.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog={deleteBlog}
            updateBlog={updateBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
