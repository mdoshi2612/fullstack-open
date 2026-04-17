import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: selectedGenre,
      author: null,
    },
  })

  const genres = useQuery(ALL_GENRES)

  const allGenres = genres.data?.allGenres || []

  if (!props.show) {
    return null
  }
  if (books.loading || genres.loading) {
    return <div>loading...</div>
  }
  if (books.error) {
    return <div>error: {books.error.message}</div>
  }

  if (genres.error) {
    return <div>error: {genres.error.message}</div>
  }

  const booksData = books.data.allBooks

  return (
    <div>
      <h2>books</h2>

      {selectedGenre && (
        <p>
          in genre <b>{selectedGenre}</b>
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {allGenres.map((genre) => (
        <button key={genre} onClick={() => setSelectedGenre(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={() => setSelectedGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
