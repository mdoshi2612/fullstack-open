import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(
    window.localStorage.getItem('library-user-token')
  )

  const [error, setError] = useState(null)

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null && (
          <button onClick={() => setPage('add')}>add book</button>
        )}
        {token !== null && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {token !== null && <button onClick={logout}>logout</button>}
        {token === null && (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommend'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={setError}
      />
    </div>
  )
}

export default App
