import { useState, useEffect } from 'react'
import phoneService from './service/phone'
import './App.css'

const Filter = ({newFilter, handleFilterChange}) => {
  return (
    <form>
      <div>
        filter shown with <input 
        value={newFilter}
        onChange={handleFilterChange}
        />
      </div>
  </form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return(
    <div className="error">
      {message}
    </div>
  )
}

const PersonForm = ({addPhone, newName, handlePhoneChange, newNumber, handleNumberChange}) => {
  return(
    <form onSubmit={addPhone}>
    <div>
      name: <input 
      value={newName}
      onChange={handlePhoneChange}
      />
    </div>
    <div>
      number: <input 
      value={newNumber}
      onChange={handleNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Person =({personToShow, deletePhone}) => {
  return(
    <>
        {
          personToShow.map(person => 
          <div key={person.name}>
            {person.name} {person.number}
            <button
              onClick={() => deletePhone(person._id)}
            >delete</button>
          </div>
          
        )}
    </>
  )
}

const App = () => {  

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  }, [])

  const [persons, setPersons] = useState([]) 

  const[newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)

  const personToShow = newFilter === '' ?
    persons :
    persons.filter(person=> person.name.toLowerCase().includes(newFilter.toLowerCase()));

  const handlePhoneChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPhone = (event) => {
    if (persons.find(person => person.name === newName) && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const person = persons.find(person => person.name === newName)
      const changedPerson = {...person, number: newNumber}

      event.preventDefault()
      phoneService
        .update(person._id, changedPerson)
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person._id !== changedPerson._id ? person : changedPerson))
          setNewName('')
          setNewNumber('')

        })
        .catch(error => {
          console.log(error)
          setMessage(`${error.response.data.error}`)
        })

        setMessage(`Updated ${newName} to ${newNumber}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      
    }else{

      event.preventDefault()
      const phoneObject = {
        name: newName,
        number: newNumber,
      }
  
      phoneService
        .create(phoneObject)
        .then(response => {
          console.log(response)
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
          setMessage(`${error.response.data.error}`)
        })

        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
    }
  }

  const deletePhone = (_id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      phoneService
        .deletePerson(_id)
        .then(response => {
          console.log(response)
          setPersons(persons.filter(person => person._id !== _id))

          setMessage(`Deleted ${persons.find(person => person._id === _id).name}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)

        })
        .catch(error => {
          console.log(error)
          setMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setMessage(null)
          }, 2000)
        })

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPhone={addPhone} newName={newName} handlePhoneChange={handlePhoneChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Person personToShow={personToShow} deletePhone={deletePhone}/>
    </div>
  )
}

export default App