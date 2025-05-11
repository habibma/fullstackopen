require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const app = express()

const Person = require('./models/person')

morgan.token('data', function (req) { return JSON.stringify(req.body) })

// --- Middleware ---
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const generateId = () => {
  const id = Math.floor(Math.random() * 1000)
  return String(id)
}

// --- Route Handlers ---
app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(count => {
      const reqDate = Date()
      res.send(`<p>Phonebook has info for ${count} people</p><p>${reqDate}</p>`)
    })
    .catch(err => next(err))
})

// to get all data
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => {
      res.json(persons)
    })
    .catch(err => next(err))
})

// to get a single data
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).send({ error: 'Person not found' })
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

// to create a data
app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number)
    return res.status(400).json({ error: 'name or number is missing' })

  const newPerson = new Person({
    id: generateId(),
    name: body.name,
    number: body.number,
  })
  newPerson.save()
    .then(savedPerson => {
      res.status(201).json(savedPerson)
    })
    .catch(err => next(err))
})

// to update an existing person
app.put('/api/persons/:id', (req, res, next) => {

  const { number } = req.body
  if (!number)
    return res.status(400).json({ error: 'number missing' })

  const id = req.params.id
  const updateData = {
    number: number,
  }
  const options = { new: true, runValidators: true, context: 'query' }
  Person.findByIdAndUpdate(id, updateData, options)
    .then(updatedPerson => {
      if (!updatedPerson)
        return res.status(404).end()
      res.json(updatedPerson)
    })
    .catch(err => next(err))
})

const errorHandler = (error, request, response, next) => {
  console.error('Error caught by errorHandler:', error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`The server is running on port ${PORT}`)
})