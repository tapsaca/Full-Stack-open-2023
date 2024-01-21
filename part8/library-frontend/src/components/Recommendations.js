import { useQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'

const Recommendations = () => {
  const books = useQuery(ALL_BOOKS)
  const favoriteGenre = useQuery(FAVORITE_GENRE)

  if (books.loading || favoriteGenre.loading) return null

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre {favoriteGenre.data.me.favoriteGenre}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks
            .filter((b) =>
              b.genres.includes(favoriteGenre.data.me.favoriteGenre)
            )
            .map((b) => (
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
