import { useQuery, useMutation } from '@apollo/client/react'
import { useState } from 'react'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBornTo] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, setBornTo: parseInt(born) } })
    setName('')
    setBornTo('')
  }

  if (!props.show) {
    return null
  }
  const authors = useQuery(ALL_AUTHORS)
  if (authors.loading) {
    return <div>loading...</div>
  }
  if (authors.error) {
    return <div>error: {authors.error.message}</div>
  }
  const authorsData = authors.data.allAuthors

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authorsData.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <label>name</label>
            <select
              value={name}
              onChange={(event) => setName(event.target.value)}
            >
              <option value="">Select author</option>
              {authorsData.map((author) => (
                <option key={author.name} value={author.name}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>born</label>
            <input
              value={born}
              onChange={({ target }) => setBornTo(target.value)}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </>
  )
}

export default Authors
