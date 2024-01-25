import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ user }) => {
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: user.favoriteGenre }
  })

  if (books.loading) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <div>books in your favorite genre {user.favoriteGenre}</div>
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
      <table></table>
    </div>
  )
}

export default Recommendations
