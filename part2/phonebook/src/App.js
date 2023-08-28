import { useEffect, useState } from 'react'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Search from './components/Search'

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState({ class: null, message: null })
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personToUpdate = persons.find(person => person.name === newName)
    if (personToUpdate) {
      if (window.confirm(`${personToUpdate.name} is already added to phonebook, replace old number with a new one?`)) {
        const personObject = { ...personToUpdate, number: newNumber}
        personService
          .update(personObject.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification({
              class: 'notification',
              message: `Number changed for ${returnedPerson.name}`
            })
          })
          .catch(error => {
            showNotification({
              class: 'error',
              message: `Information of ${personToUpdate.name} has already been removed from server.`
            })
            setPersons(persons.filter(person => person.name !== personToUpdate.name))
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification({
            class: 'notification',
            message: `Added ${returnedPerson.name}`
          })
        })
        .catch(error => {
          showNotification({
            class: 'error',
            message: error.response.data.error
          })
        })
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteObject(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showNotification({
            class: 'notification',
            message: `Deleted ${name}`
          })
        })
        .catch(error => {
          showNotification({
            class: 'error',
            message: `Information of ${name} has already been removed from server.`
          })
          setPersons(persons.filter(person => person.name !== name))
        })
    }
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const showNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {
      setNotification({ message: null, color: null })
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification className={notification.class} message={notification.message} />
      <Search filter={newFilter} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        handleNameChange={handleNameChange}
        number={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App