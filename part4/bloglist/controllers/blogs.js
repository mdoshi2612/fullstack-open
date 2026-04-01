const express = require('express')
const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = express.Router()

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
      ...request.body,
      user: request.user._id,
    })

    const result = await blog.save()

    request.user.blogs = request.user.blogs.concat(result._id)
    await request.user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: 'token invalid or missing' })
    }

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).json({ error: 'blog does not exist' })
    }

    if (request.user.id !== blog.user.toString()) {
      return response
        .status(403)
        .json({ error: 'you are not the owner of this blog' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

    if (deletedBlog?.user) {
      await User.findByIdAndUpdate(deletedBlog.user, {
        $pull: { blogs: deletedBlog._id },
      })
    }
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes, user } = request.body
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes, user },
      { runValidators: true, returnDocument: 'after' }
    )
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
