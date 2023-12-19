import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { addBlog, initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      dispatch(addBlog(blogObject, user))
      dispatch(
        setNotification({
          class: 'notification',
          message: `Blog ${blogObject.title} added`
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

  // const deleteBlog = async (blogObject) => {
  //   try {
  //     if (window.confirm(`Delete blog '${blogObject.title}'`)) {
  //       await blogService.deleteObject(blogObject.id)
  //       setBlogs(blogs.filter((blog) => blog.id !== blogObject.id))
  //       dispatch(
  //         setNotification({
  //           class: 'notification',
  //           message: `Blog '${blogObject.title}' deleted`
  //         })
  //       )
  //     }
  //   } catch (exception) {
  //     dispatch(
  //       setNotification({
  //         class: 'error',
  //         message: 'Deletion failed'
  //       })
  //     )
  //   }
  // }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      setUsername('')
      setPassword('')
      dispatch(
        setNotification({
          class: 'notification',
          message: `Hello ${loggedUser.name}`
        })
      )
    } catch (exception) {
      dispatch(
        setNotification({
          class: 'error',
          message: 'Login failed'
        })
      )
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  // const updateBlog = async (id, blogObject) => {
  //   const updatedBlog = await blogService.update(id, blogObject)
  //   updatedBlog.user = { name: user.name, username: user.username }
  //   setBlogs(
  //     blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
  //   )
  // }

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
        .slice()
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

export default App
