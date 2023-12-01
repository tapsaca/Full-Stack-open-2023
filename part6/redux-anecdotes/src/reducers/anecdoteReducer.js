import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const changedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== changedAnecdote.id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.update(anecdote.id, { ...anecdote, votes: anecdote.votes + 1 })
    dispatch(addVote(changedAnecdote))
  }
}

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer