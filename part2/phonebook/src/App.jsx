import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Message from './components/Message.jsx'
import {
  getAll,
  addNewPerson,
  deletePerson,
  putPerson,
} from './services/Phone.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    getAll().then((data) => {
      setPersons(data)
    })
  }, [])

  const handleChange = (setter) => (event) => {
    setter(event.target.value)
  }

  const handleDeleteClick = (id) => () => {
    const person = persons.find((p) => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id))
        })
        .catch((_error) => {
          setPersons(persons.filter((p) => p.id !== id))
          setMessageType('error')
          setMessage(`This person has already been removed from the server`)
          setTimeout(() => setMessage(null), 5000)
        })
    }
  }

  const handleUpdate = (currentPerson) => {
    const updatedPerson = { ...currentPerson, number: newPhoneNumber }
    putPerson(currentPerson.id, updatedPerson)
      .then((response) => {
        setPersons(
          persons.map((p) => (p.id === currentPerson.id ? response : p))
        )
        setNewName('')
        setNewPhoneNumber('')
        setMessageType('success')
        setMessage(`Changed ${currentPerson.name}'s number successfully`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setPersons(persons.filter((p) => p.id !== currentPerson.id))
          setMessageType('error')
          setMessage(
            `${currentPerson.name} has already been removed from the server`
          )
          setTimeout(() => setMessage(null), 5000)
        }
      })
  }

  const handleAddition = (newPerson) => {
    addNewPerson(newPerson).then((response) => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewPhoneNumber('')
      setMessageType('success')
      setMessage(`Added ${newPerson.name} successfully`)
      setTimeout(() => setMessage(null), 5000)
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const existingPerson = persons.find((p) => p.name === newName)
    if (existingPerson) {
      if (window.confirm(`${newName} already exists, replace number?`)) {
        handleUpdate(existingPerson)
      }
      return
    }
    handleAddition({ name: newName, number: newPhoneNumber })
  }

  const personsToShow =
    filteredName === ''
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filteredName.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        filteredName={filteredName}
        onChange={handleChange(setFilteredName)}
      />
      <h2>add a new</h2>
      <Message message={message} type={messageType} />
      <PersonForm
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        handleNameChange={handleChange(setNewName)}
        newPhoneNumber={newPhoneNumber}
        handlePhoneNumberChange={handleChange(setNewPhoneNumber)}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} onClick={handleDeleteClick} />
    </div>
  )
}

export default App
