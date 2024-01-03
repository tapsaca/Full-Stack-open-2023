import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { StyledButton, StyledForm, StyledInput } from './styles'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    dispatch(login(username, password))
  }

  return (
    <StyledForm onSubmit={handleLogin}>
      <div>
        Username
        <StyledInput name="username" />
      </div>
      <div>
        Password
        <StyledInput name="password" type="password" />
      </div>
      <StyledButton id="login-button" type="submit">
        Login
      </StyledButton>
    </StyledForm>
  )
}

export default LoginForm
