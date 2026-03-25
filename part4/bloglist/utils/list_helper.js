const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = (likes, blog) => {
    return likes + blog.likes
  }

  return blogs.reduce(total, 0)
}

const favouriteBlog = (blogs) => {
  const comparator = (prev, current) => {
    return prev.likes > current.likes ? prev : current
  }
  if (blogs.length === 0) return {}
  return blogs.reduce(comparator, blogs[0])
}

const mostBlogs = (blogs) => {
  const authors = {}

  if (blogs.length === 0) return {}

  blogs.forEach((blog) => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })

  const comparator = (prevAuthor, currentBlog) => {
    return authors[prevAuthor] >= authors[currentBlog.author]
      ? prevAuthor
      : currentBlog.author
  }

  const highestAuthor = blogs.reduce(comparator, blogs[0].author)

  return { author: highestAuthor, blogs: authors[highestAuthor] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const likes = {}

  blogs.forEach((blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
  })

  const comparator = (prevAuthor, currentBlog) => {
    return likes[prevAuthor] >= likes[currentBlog.author]
      ? prevAuthor
      : currentBlog.author
  }

  const highestAuthor = blogs.reduce(comparator, blogs[0].author)

  return { author: highestAuthor, likes: likes[highestAuthor] }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }
