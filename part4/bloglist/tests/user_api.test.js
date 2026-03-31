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

describe('user creation', () => {
  test('fails with status code 400 if username is not unique', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'root',
      name: 'Another Root',
      password: 'secret',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.match(result.body.error, /unique/i)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if username is too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'ab',
      name: 'Short Username',
      password: 'secret',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.match(result.body.error, /username/i)
    assert.match(result.body.error, /at least 3/i)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if password is too short', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'validuser',
      name: 'Short Password',
      password: 'ab',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.match(result.body.error, /password/i)
    assert.match(result.body.error, /at least 3/i)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('fails with status code 400 if username or password is missing', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      name: 'Missing fields',
    }

    const result = await api.post('/api/users').send(newUser).expect(400)

    assert.match(result.body.error, /required/i)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
