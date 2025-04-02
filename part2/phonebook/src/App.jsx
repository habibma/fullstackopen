import { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Filter = ({ filter, handleFilterChange }) => {
  return <p>filter shown with <input value={filter} onChange={handleFilterChange} /></p>
}

const PersonForm = ({ newName, newNumber, handlePersonChange, handleNumberChange, AddToPersons }) => {
 return (
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
 )
}

const Notification = ({ notif }) => {
  if (!notif)
    return null;
  return (
    <div className='notif'>
      {notif}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notif, setNotif] = useState()

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [persons])

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  const AddToPersons = event => {
    event.preventDefault();
    const personExists = persons.some(person => person.name === newName)
    if (personExists) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
       const person = persons.find(person => person.name === newName)
       const updatedPerson = {...person, number: newNumber}
       personsService
       .update(person.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          setNotif(`${person.name} updated!`)
          setTimeout(() => {
            setNotif(null)
          }, 3000)
       })
       .catch(error => {
        setNotif(
          `Person '${person.name}' was already removed from server`
        )
        setTimeout(() => {
          setNotif(null)
        }, 3000)
        setPersons(persons.filter(n => n.id !== id))
      })
      }
      return ;
    }
    personsService
    .create({name: newName , number: newNumber})
    .then(returnedPerson => {
      persons.concat(returnedPerson)
      setNotif(`${returnedPerson.name} Added!`)
      setTimeout(() => {
        setNotif(null)
      }, 3000)
    })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id).name
    const confirm = window.confirm(`Delete ${person} ?`)
    if (confirm) {
      personsService
        .remove(id)
        .then ((res) => {
          setPersons(persons.filter(person => person.id !== res.id))
          setNotif(`${res.name} deleted!`)
          setTimeout(()=>{
            setNotif(null)
          }, 3000)
        })
        .catch(() => {
          setNotif(`${person} is already deleted from server!`)
        })
    }
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notif={notif} />
      <Filter filter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} AddToPersons={AddToPersons} />
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button></p>)}
      </div>
    </div>
  )
}

export default App