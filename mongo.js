const mongoose = require('mongoose')

if (process.argv.length !== 5)
{
    console.log('usage:','node mongo.js <yourpassword> <name> <number>')
    process.exit(1)
}

const pass = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://habibmote:${pass}@cluster0.vpdylb2.mongodb.net/persons?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    'name': String,
    'number': String
})

const Person = mongoose.model('Person', personSchema);

const newPerson = new Person({
    name: name,
    number: number
})

newPerson.save().then(result => {
    console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`);
})

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name, person.number);
        mongoose.connection.close();
    })
})
