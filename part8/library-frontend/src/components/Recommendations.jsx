import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, CURRENT_USER } from '../queries'

const Recommendations = (props) => {
  const user = useQuery(CURRENT_USER)

  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: user.data?.me?.favoriteGenre || '',
    },
    skip: !user.data?.me,
  })

  if (!props.show) {
    return null
  }

  if (user.loading) {
    return <div>loading...</div>
  }
  if (user.error) {
    return <div>error: {user.error.message}</div>
  }

  const userData = user.data.me

  if (userData === null) {
    return <div>You are not logged in</div>
  }

  if (books.loading) {
    return <div>loading books...</div>
  }
  if (books.error) {
    return <div>error loading books: {books.error.message}</div>
  }

  const booksData = books.data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        books in your favorite genre <b>{userData.favoriteGenre}</b>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksData.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
