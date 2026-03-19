require('dotenv').config()
const express = require('express')
const Person = require('./models/person.js')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/info', (request, response) => {
  Person.find({}).then((result) => {
    response.send(`<p>Phonebook has info for ${result.length} people</p>
        <p>${new Date()}</p>`)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then((person) => response.json(person))
    .catch(() => response.status(404).json({ error: 'person not found' }))
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name) return response.status(400).json({ error: 'name is missing' })
  if (!number) return response.status(400).json({ error: 'number is missing' })

  const newPerson = new Person({
    name: name,
    number: number,
  })
  newPerson.save().then((savedPerson) => response.status(201).json(savedPerson))
})

app.delete('/api/persons/:id', (request, response) => {
  phonebook = phonebook.filter((person) => person.id !== request.params.id)
  response.status(204).end()
})
