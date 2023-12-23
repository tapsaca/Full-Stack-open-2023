import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

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
        Username <input name="username" />
      </div>
      <div>
        Password <input name="password" type="password" />
      </div>
      <button id="login-button" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
