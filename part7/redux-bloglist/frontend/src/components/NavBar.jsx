import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { Button } from './styled'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <Navigation>
      <Link style={{ marginRight: 10 }} to="/">
        Blogs
      </Link>
      <Link style={{ marginRight: 10 }} to="/users">
        Users
      </Link>
      User: {user.name} <Button onClick={handleLogout}>Logout</Button>
    </Navigation>
  )
}

export default NavBar

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`
