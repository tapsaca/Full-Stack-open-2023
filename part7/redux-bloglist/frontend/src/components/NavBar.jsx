import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'
import { StyledButton } from './styles'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <Navigation>
      <NavBarLink to="/">Blogs</NavBarLink>
      <NavBarLink to="/users">Users</NavBarLink>
      User: {user.name}
      <StyledButton onClick={handleLogout}>Logout</StyledButton>
    </Navigation>
  )
}

export default NavBar

const NavBarLink = styled(Link)`
  color: #f9ebde;
  font-size: 2em;
  text-decoration: none;
  margin: 0.25em;
  &:hover {
    color: #000000;
  }
`

const Navigation = styled.div`
  background: #815854;
  border-radius: 0.25em;
  color: #f9ebde;
  padding: 0.5em;
`
