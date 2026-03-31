const BlogEntry = ({
  createNewBlog,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
}) => {
  return (
    <>
      <h1>create new</h1>
      <form onSubmit={createNewBlog}>
        <p>
          title:{' '}
          <input type="text" value={title} onChange={handleTitleChange} />
          <br />
          author:{' '}
          <input type="text" value={author} onChange={handleAuthorChange} />
          <br />
          url: <input type="text" value={url} onChange={handleUrlChange} />
          <br />
          <button type="submit">create blog</button>
        </p>
      </form>
    </>
  )
}

export default BlogEntry
