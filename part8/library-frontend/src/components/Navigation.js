import { useNavigate } from 'react-router-dom'

const Navigation = ({ logout, token }) => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>authors</button>
      <button onClick={() => navigate('/books')}>books</button>
      {token ? (
        <>
          <button onClick={() => navigate('/add')}>add book</button>
          <button onClick={() => navigate('/recommendations')}>
            recommendations
          </button>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <button onClick={() => navigate('/login')}>login</button>
      )}
    </div>
  )
}

export default Navigation
