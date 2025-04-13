require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

// --- Middleware ---
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(express.static('dist'))

/* let persons = [
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
] */

const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    return String(id);
}

// --- Route Handlers ---

app.get('/info', (req, res) => {
    const reqDate = Date();
    res.send(`<p>Phonebook has info for ${Person.find({}).length} people</p><p>${reqDate}</p>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        })
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id)
        .then(person => {
            if (person)
                res.json(person);
            else
                res.status(404).send({ error: 'Person not found'});
        })
})

/* app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})*/

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if (!body.name || !body.number)
        return res.status(400).json({error: "name or number is missing"})

    // if (persons.map(p => p.name).includes(body.name))
    //     return res.status(409).json({error: "name must be unique"})

    const newPerson = new Person({
        id: generateId(),
        name: body.name,
        number: body.number,
    })
    newPerson.save()
        .then(savedPerson => {
            res.status(201).json(savedPerson);
        });
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})