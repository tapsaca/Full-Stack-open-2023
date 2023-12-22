import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logout } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
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
      <h1>Blogs</h1>
      <Notification />
      <div>
        <p>User: {user.name}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
