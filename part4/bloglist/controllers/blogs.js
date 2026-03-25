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

module.exports = blogRouter
