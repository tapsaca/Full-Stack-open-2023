import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = () => {
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  if (books.loading) return null

  if (!genres.length) {
    setGenres([...new Set(books.data.allBooks.map((b) => b.genres).flat())])
  }

  return (
    <div>
      <h2>books</h2>
      {!filter ? null : <div>in genre {filter}</div>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
