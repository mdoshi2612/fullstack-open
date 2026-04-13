import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    initializeNotes(state, action) {
      return action.payload
    },
    increaseVote(state, action) {
      const note = state.find((item) => item.id === action.payload)
      if (note) {
        note.votes += 1
      }
    },
    addNote(state, action) {
      state.push(action.payload)
    },
    updateNote(state, action) {
      return state.map((note) =>
        note.id === action.payload.id ? action.payload : note
      )
    },
  },
})

const { initializeNotes, addNote, updateNote } = anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  dispatch(initializeNotes(anecdotes))
}

export const createAnecdote = (content) => async (dispatch) => {
  const newNote = await anecdoteService.createNew(content)
  dispatch(addNote(newNote))
}

export const voteAnecdote = (id) => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()
  const anecdoteToUpdate = anecdotes.find((anecdote) => anecdote.id === id)
  if (!anecdoteToUpdate) {
    return
  }
  const updatedAnecdote = await anecdoteService.update(id, {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  })
  dispatch(updateNote(updatedAnecdote))
}

export default anecdoteSlice.reducer
