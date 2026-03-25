const express = require('express')
const Blog = require('../models/blog')
const blogRouter = express.Router()

blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (error) {
    next(error)
  }
})

blogRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
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
