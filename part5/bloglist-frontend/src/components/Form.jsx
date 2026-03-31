const Form = ({
  handleFormSubmit,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  message,
}) => {
  return (
    <div>
      <h1>login to application</h1>
      <h1>{message}</h1>
      <form onSubmit={handleFormSubmit}>
        <p>
          username:{' '}
          <input type="text" value={username} onChange={handleUsernameChange} />
          <br />
          password:{' '}
          <input type="text" value={password} onChange={handlePasswordChange} />
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Form
