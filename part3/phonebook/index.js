const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let phonebook = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: '4',
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())
app.use(cors())
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      JSON.stringify(req.body),
    ].join(' ')
  })
)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${phonebook.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find((p) => p.id === id)

  if (!person) {
    response.status(404).json({ error: 'person not found' })
  } else {
    response.json(person)
  }
})

app.post('/api/persons', (request, response) => {
  const { name, number } = request.body

  if (!name) return response.status(400).json({ error: 'name is missing' })
  if (!number) return response.status(400).json({ error: 'number is missing' })

  if (phonebook.find((p) => p.name === name))
    return response.status(400).json({ error: 'name must be unique' })

  const newPerson = {
    id: String(Math.floor(Math.random() * 100000)),
    name,
    number,
  }
  phonebook = phonebook.concat(newPerson)
  response.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
  phonebook = phonebook.filter((person) => person.id !== request.params.id)
  response.status(204).end()
})
