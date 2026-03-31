import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogEntry from './components/BlogEntry'
import Form from './components/Form'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loginCredentials')
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser.token)
      setName(parsedUser.name)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({ username, password })
      setUser(user.data.token)
      setName(user.data.name)
      blogService.setToken(user.data.token)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loginCredentials', JSON.stringify(user.data))
    } catch (error) {
      setMessage('wrong username/password')
      setTimeout(() => setMessage(''), 5000)
      console.log('Failed to login')
    }
  }

  const handleLogout = () => {
    setUser(null)
    setName(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loginCredentials')
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create({ title, author, url })
      setBlogs((prevBlogs) => prevBlogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.log('Failed to create blog')
    }
  }

  return (
    <div>
      {user && (
        <>
          <h2>Blogs</h2>
          <h1>{message}</h1>
          {name && (
            <p>
              {name} logged in <button onClick={handleLogout}>logout</button>
            </p>
          )}
          <BlogEntry
            createNewBlog={createNewBlog}
            title={title}
            handleTitleChange={handleTitleChange}
            author={author}
            handleAuthorChange={handleAuthorChange}
            url={url}
            handleUrlChange={handleUrlChange}
          />

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
      {!user && (
        <>
          <Form
            handleFormSubmit={handleFormSubmit}
            username={username}
            password={password}
            handlePasswordChange={handlePasswordChange}
            handleUsernameChange={handleUsernameChange}
            message={message}
          />
        </>
      )}
    </div>
  )
}

export default App
