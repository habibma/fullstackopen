import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const AddToPersons = event => {
    event.preventDefault();
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return ;
    }
    setPersons(persons.concat({ name: newName , number: newNumber}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddToPersons}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App