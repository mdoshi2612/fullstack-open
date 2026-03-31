const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send({
    username: 'root',
    name: 'Superuser',
    password: 'sekret',
  })
})

describe('login', () => {
  test('succeeds with valid credentials and returns token', async () => {
    const credentials = {
      username: 'root',
      password: 'sekret',
    }

    const result = await api.post('/api/login').send(credentials).expect(200)

    assert.ok(result.body.token)
    assert.strictEqual(result.body.username, credentials.username)
  })

  test('fails with status code 401 for invalid credentials', async () => {
    const credentials = {
      username: 'root',
      password: 'wrong',
    }

    const result = await api.post('/api/login').send(credentials).expect(401)
    assert.match(result.body.error, /invalid username or password/i)
  })
})

after(async () => {
  await mongoose.connection.close()
})
