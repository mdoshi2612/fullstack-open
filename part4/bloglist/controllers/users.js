const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = express.Router()

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    response.json(users)
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (request, response, next) => {
  try {
    const { username, password, name } = request.body

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: 'username and password are required' })
    }

    if (username.length < 3) {
      return response
        .status(400)
        .json({ error: 'username must be at least 3 characters long' })
    }

    if (password.length < 3) {
      return response
        .status(400)
        .json({ error: 'password must be at least 3 characters long' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      passwordHash,
      name,
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter
