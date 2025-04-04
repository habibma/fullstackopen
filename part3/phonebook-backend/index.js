const express = require('express');
const morgan = require('morgan');

const app = express();
morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    return String(id);
}

app.get('/info', (req, res) => {
    const reqDate = Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${reqDate}</p>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    const person = persons.find(p => p.id === id)
    if (person)
        res.json(person);
    else
        res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number)
        return res.status(400).json({error: "name or number is missing"})

    if (persons.map(p => p.name).includes(body.name))
        return res.status(409).json({error: "name must be unique"})

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }
    persons.push(newPerson);
    res.status(201).json(newPerson)
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})