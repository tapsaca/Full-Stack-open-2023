import { useNavigate } from 'react-router-dom'

const Navigation = () => {
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('/')}>authors</button>
      <button onClick={() => navigate('/books')}>books</button>
      <button onClick={() => navigate('/add')}>add book</button>
    </div>
  )
}

export default Navigation
