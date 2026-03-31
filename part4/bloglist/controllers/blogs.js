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
    const user = await User.findOne({})
    if (!user) {
      return response.status(400).json({ error: 'no users available' })
    }

    const blog = new Blog({
      ...request.body,
      user: user._id,
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
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
    const { title, author, url, likes } = request.body
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      { runValidators: true, returnDocument: 'after' }
    )
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
