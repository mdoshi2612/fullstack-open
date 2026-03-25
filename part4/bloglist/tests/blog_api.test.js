const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'First test blog',
    author: 'Test Author 1',
    url: 'https://example.com/first',
    likes: 1,
  },
  {
    title: 'Second test blog',
    author: 'Test Author 2',
    url: 'https://example.com/second',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('blog api', () => {
  test('blogs are returned as json and correct amount', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier is named `id` (not `_id`)', async () => {
    const response = await api.get('/api/blogs').expect(200)

    assert.ok(response.body.length > 0)
    const firstBlog = response.body[0]

    assert.ok(firstBlog.id)
    assert.strictEqual(firstBlog._id, undefined)
  })

  test('adding blog post increases total posts by 1', async () => {
    const newBlog = {
      title: 'A brand new test blog',
      author: 'Post Test Author',
      url: 'https://example.com/new-blog',
      likes: 25,
    }

    const totalBlogsBeforeAdding = (await api.get('/api/blogs')).body.length

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)

    const blogsAfterAdding = (await api.get('/api/blogs')).body
    const totalBlogsAfterAdding = blogsAfterAdding.length
    assert.strictEqual(totalBlogsBeforeAdding + 1, totalBlogsAfterAdding)
    assert.ok(blogsAfterAdding.some((blog) => blog.title === newBlog.title))
  })

  test('adding blog post without likes defaults to 0', async () => {
    const newBlog = {
      title: 'A brand new test blog',
      author: 'Post Test Author',
      url: 'https://example.com/new-blog',
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('adding blog post without title fails with status code 400', async () => {
    const newBlog = {
      author: 'No Title Author',
      url: 'https://example.com/no-title',
      likes: 10,
    }

    const blogsAtStart = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
  })

  test('adding blog post without url fails with status code 400', async () => {
    const newBlog = {
      title: 'No URL Blog',
      author: 'No URL Author',
      likes: 10,
    }

    const blogsAtStart = await api.get('/api/blogs')

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Accept', 'application/json')
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
