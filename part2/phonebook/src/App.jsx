import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const AddToPersons = event => {
    event.preventDefault();
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
      return ;
    }
    setPersons(persons.concat({ name: newName}))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={AddToPersons}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App