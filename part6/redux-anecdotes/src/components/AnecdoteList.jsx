import { useDispatch, useSelector } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => state.notes)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const visibleAnecdotes = sortedAnecdotes.filter(
    (anecdote) =>
      filter === '' || new RegExp(filter, 'i').test(anecdote.content)
  )

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(increaseVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
