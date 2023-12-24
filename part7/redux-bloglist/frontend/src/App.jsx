import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  if (!user) {
    return (
      <div>
        <h1>Login to BlogList</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h1>Bloglist</h1>
      <Notification />
      <div>
        <p>User: {user.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
