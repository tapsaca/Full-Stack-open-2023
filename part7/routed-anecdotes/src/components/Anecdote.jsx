const Anecdote = ({ anecdote }) => {
  if (!anecdote) {
    return (
      <div>
        <h2>Anecdote not found</h2>
      </div>
    )
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote