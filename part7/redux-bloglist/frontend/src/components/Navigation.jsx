import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div style={{ backgroundColor: 'gray', padding: 5 }}>
      <Link style={{ marginRight: 10 }} to="/">
        Blogs
      </Link>
      <Link style={{ marginRight: 10 }} to="/users">
        Users
      </Link>
      User: {user.name} <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navigation
