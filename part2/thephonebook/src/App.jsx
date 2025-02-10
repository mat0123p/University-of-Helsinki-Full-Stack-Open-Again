import axios from 'axios'
import { useState, useEffect } from 'react'

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

const Person =({personToShow}) => {
  return(
    <>
        {personToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </>
  )
}

const App = () => {  

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
    .then(response => 
      setPersons(response.data)
    )}, [])

  const [persons, setPersons] = useState([]) 

  const[newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    event.preventDefault()
    const phoneObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(phoneObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm addPhone={addPhone} newName={newName} handlePhoneChange={handlePhoneChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Person personToShow={personToShow}/>
    </div>
  )
}

export default App