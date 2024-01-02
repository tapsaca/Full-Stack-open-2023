import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Button, Input } from './styled'

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
    <form onSubmit={handleLogin}>
      <div>
        Username <Input name="username" />
      </div>
      <div>
        Password <Input name="password" type="password" />
      </div>
      <Button id="login-button" type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
