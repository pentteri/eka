import React, { useState } from 'react'

const Filter = (props) => (
    <div>
      filter shown with: 
      <input
        value={props.value}
        onChange={props.handler}
      />
    </div>
)

const PersonForm = (props) => (
    <form onSubmit={props.adder}>
        <div>
          name: 
          <input 
            value={props.name}
            onChange={props.nameHandler}
          />
          <div>number :
          <input
            value={props.number}
            onChange={props.numberHandler}
          />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Persons = (props) => (
    props.phonebook
        .filter(p => p.name.toUpperCase().includes(props.filter.toUpperCase()))
        .map(p => <p key={p.name}>{p.name} {p.number}</p>)
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

    const addPers = (event) => {
        event.preventDefault()
        console.log('button clicked', newName)
        if (persons.find(p => p.name === newName)) { 
            alert(`${newName} is already added to phonebook`)
        } else {
            const persObject = {
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(persObject))
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)  
    }   

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)  
    }   

    const handleFilterChange = (event) => {
        console.log(event.target.value)
        setNewFilter(event.target.value)  
    }   



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value = {newFilter} handler = {handleFilterChange}/>

      <h2>Add new</h2>
      <PersonForm 
        adder = {addPers} 
        name = {newName} 
        nameHandler = {handleNameChange} 
        number = {newNumber}
        numberHandler = {handleNumberChange} />

      <h2>Numbers</h2>
      <Persons filter = {newFilter} phonebook = {persons} />
      
    </div>
  )

}

export default App