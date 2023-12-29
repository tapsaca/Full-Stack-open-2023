import { useNotificationDispatch } from '../NotificationContext'
import { useUserDispatch } from '../UserContext'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = () => {
  const dispatch = useNotificationDispatch()
  const userDispatch = useUserDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const loggedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)
      userDispatch({ type: 'SET', payload: loggedUser })
      event.target.username.value = ''
      event.target.password.value = ''
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

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username <input name="username" />
        </div>
        <div>
          Password <input name="password" />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
