import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = () => {
  const [changeYear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })
  const authors = useQuery(ALL_AUTHORS)

  const handleSubmit = (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const year = parseInt(event.target.year.value)
    event.target.name.value = ''
    event.target.year.value = ''
    changeYear({ variables: { name, year } })
  }

  if (authors.loading) return null

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name
          <input name="name" />
        </div>
        <div>
          born
          <input name="year" />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
