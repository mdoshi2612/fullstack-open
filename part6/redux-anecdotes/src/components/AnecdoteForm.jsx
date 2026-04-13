import { useDispatch } from 'react-redux'
import { addNote } from '../reducers/anecdoteReducer'
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    if (content.trim()) {
      const createdAnecdote = await anecdoteService.createNew(content)
      dispatch(addNote(createdAnecdote))
      dispatch(setNotification(`you created '${content}'`))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
