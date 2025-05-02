require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const app = express();

const Person = require('./models/person')

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })

// --- Middleware ---
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const generateId = () => {
    const id = Math.floor(Math.random() * 1000);
    return String(id);
}

// --- Route Handlers ---
app.get('/info', (req, res) => {
    const reqDate = Date();
    res.send(`<p>Phonebook has info for ${Person.find({}).length} people</p><p>${reqDate}</p>`)
})

// to get all data
app.get('/api/persons', (req, res) => {
    Person.find({})
        .then(persons => {
            res.json(persons);
        })
})

// to get a single data
app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.findById(id)
        .then(person => {
            if (person)
                res.json(person);
            else
                res.status(404).send({ error: 'Person not found'});
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
          })
})

app.delete('/api/persons/:id', (req, res, next) => {
    const id = req.params.id;
    Person.findByIdAndDelete(id)
        .then(result => {
            res.status(204).end()
        })
        .catch(err => next(err))
})


// to create a data
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