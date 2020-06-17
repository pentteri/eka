
TÄÄ ON VÄHä KESKEN, HUONO RAKEENE ja pikkasen toiminnallisuutta info ja err msg puuttu

import React, { useState, useEffect } from 'react'
import pbService from './services/phonebook.js'

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

const poies = (id, phonebook, setter) => {
  if (window.confirm('Are you sure?')) {
    pbService
      .remove(id)
        .then(response => {
          setter(phonebook.filter(p => p.id !== id))
        })
        .catch(err => { 
          console.log(`Removing contact ${id} failed`) 
          { /* setTimeout(() => setErrMsg(null), 3000) */ }
        } )
  }
}

{ /*
    axios
      .delete(`http://localhost:3001/persons/${id}`)
      .then(response => {
        setter(phonebook.filter(p => p.id !== id))
        alert('Pois on')
      })
      .catch(response => alert(response))
    }

*/}

const Persons = (props) => (
  <table>
    <tbody>
      <tr>
        <td>Name</td>
        <td>Number</td>
        <td>Action</td>
      </tr>
      {props.phonebook
        .filter(p => p.name.toUpperCase().includes(props.filter.toUpperCase()))
        .map(p =>          
          <tr key={p.id}>
            <td>{p.name}</td>
            <td>{p.number}</td>
            <td>
              <button type='button' onClick={() => poies(p.id, props.phonebook, props.setPersons)} >
                poies
              </button>
            </td>
          </tr>
        )}
        </tbody>
  </table>
)

const Notification = ({msg, kind}) => {
  return (
    msg ?
      <div className={kind}>
        {msg}
      </div>
    : null
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ infoMsg, setInfoMsg] = useState('Welcome!')
  const [ errorMsg, setErrMsg] = useState('')
  const setState = {setPersons, setNewName, setNewNumber, setNewFilter, setInfoMsg, setErrMsg}
  setTimeout(() => {setInfoMsg(null)}, 2000)

  useEffect(() => {
    console.log('effect')    
    pbService
      .getAll()
        .then(pb => {
          setPersons(pb)
        })
  }, [])

  { /* 
  axios      
      .get('http://localhost:3001/persons')      
      .then(response => {        
        console.log('luvatut henkilöt löytyi')        
        setPersons(response.data)      
      })  
    }, [])  

  */}

    
    const addPers = (event) => {
        event.preventDefault()
        console.log('button clicked', newName)
        const found=persons.find(p => p.name === newName)
        if (found) { 
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with new?`)) {
              const persObject = {
                ...found,
                number: newNumber
             }
             pbService
              .update(found.id, persObject)
                .then(updated => {
                  setPersons(persons.map(p => p.id === found.id ? updated : p))
                  setNewName('')
                  setNewNumber('')
                })
            }
            {/*
            axios
              .put(`http://localhost:3001/persons/${found.id}`, persObject)
              .then( response => {
                setPersons(persons.map(p => p.id === found.id ? persObject : p))
                setNewName('')
                setNewNumber('')
              })
             */}

        } else {
            const persObject = {
                name: newName,
                number: newNumber
            }
            pbService
              .create(persObject)
                .then(added => {
                  setPersons(persons.concat(added))
                  setNewName('')
                  setNewNumber('')
                })
            {/* 
            axios
              .post('http://localhost:3001/persons', persObject)
              .then( response => {
                setPersons(persons.concat(persObject))
                setNewName('')
                setNewNumber('')
              })
            */}
            
            
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
      <Notification msg={errorMsg} kind='error' />
      <Notification msg={infoMsg} kind='info' />
      <h2>Phonebook</h2>
      <Filter value = {newFilter} handler = {handleFilterChange}/>

      <h2>Add new</h2>
      <PersonForm 
        adder={addPers} 
        name={newName} 
        nameHandler={handleNameChange} 
        number={newNumber}
        numberHandler={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons filter={newFilter} phonebook={persons} setPersons={setPersons}/>
      
    </div>
  )

}

export default App