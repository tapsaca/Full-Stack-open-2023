import { useApolloClient } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import Navigation from './components/Navigation'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'

const App = () => {
  const client = useApolloClient()
  const navigate = useNavigate()
  const [token, setToken] = useState(null)

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')
    if (userToken) {
      setToken(userToken)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/')
  }

  return (
    <div>
      <Navigation logout={handleLogout} token={token} />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route
          path="/login"
          element={<LoginForm token={token} setToken={setToken} />}
        />
        <Route path="/recommendations" element={<Recommendations />} />
      </Routes>
    </div>
  )
}

export default App
