import { Route, Routes } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import Navigation from './components/Navigation'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
