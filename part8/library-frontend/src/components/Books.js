import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = ({ books }) => {
  const [filter, setFilter] = useState('')
  const filteredBooks = useQuery(ALL_BOOKS, {
    variables: { genre: filter }
  })

  if (filteredBooks.loading) return null

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
          {!filter
            ? books.data.allBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))
            : filteredBooks.data.allBooks.map((b) => (
                <tr key={b.title}>
                  <td>{b.title}</td>
                  <td>{b.author.name}</td>
                  <td>{b.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <div>
        {[...new Set(books.data.allBooks.map((b) => b.genres).flat())].map(
          (g) => (
            <button key={g} onClick={() => setFilter(g)}>
              {g}
            </button>
          )
        )}
        <button onClick={() => setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
