import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => (
  <div>
    find countries: 
    <input
      value={props.value}
      onChange={props.handler}
    />
  </div>
)

const Toomany = () => (
  <div>Too many matches, specify another filter</div>
)

const Countries = (props) => {
  console.log(props)
  return (
    <div>
      {props.countries.map(c => 
        <div key={c.name}>
          {c.name} 
          <button type="button" onClick={() => props.setfilter(c.name)}>show</button>
        </div>)}
    </div>
    
  )
}

const Weather = (props) => {
  console.log("Weather")
  console.log(props)
  return (
    <div>
      {props.city}
    <table style={{border: '1px solid black'}}>
      <tbody>
      <tr>
        <td>Temp</td>
        <td>Wind</td>
        <td>Description</td>
      </tr>
      <tr>
        <td>{`${props.weather.temperature} C`}</td>
        <td><div>{`Direction: ${props.weather.wind_dir}`}</div><div>{`Speed: ${props.weather.wind_speed} km/h`}</div></td>
        <td>
          {props.weather.weather_descriptions.map(d => <div>{d}</div>)}
          {props.weather.weather_icons.map(i => <img src={i} alt={i}/>)}
        </td>
      </tr>
      </tbody>
    </table>
    </div>
  )
}

const Country = (props) => {
  console.log("Country")
  console.log(props)
  console.log(props.weather.length)
  const meteo = props.weather.hasOwnProperty('current')

  useEffect(() => {
    console.log("kysy sää")
    axios
      .get(`http://api.weatherstack.com/current?access_key=${props.api_key}&query=${props.country.capital}`)
      .then(response => {
        console.log("sää tiedossa")
        props.set(response.data)
      })
  }, [props])

  return( 
    <div>
      <h2>{props.country.name}</h2>
      <div>capital {props.country.capital}</div>
      <div>population {props.country.population}</div>
      <h2>languages</h2>
      <ul>
        {props.country.languages.map(l => <li>{l.name}</li>)}
      </ul>
      <img src={props.country.flag} alt="{props.country.name} flag" height="100" />
      <h2>weather</h2>
      {meteo ? <Weather weather={props.weather.current} city={props.country.capital}/> : "weather not available"}
    </div>
  )
}

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ weather, setWeather ] = useState([])
  const matches = countries
    .filter(c => c.name.toUpperCase().includes(newFilter.toUpperCase()))
  const api_key = process.env.REACT_APP_API_KEY
  
  console.log("App")
  console.log(weather)
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)  
  }   

  useEffect(() => {
    console.log('effect')    
    axios      
      .get('https://restcountries.eu/rest/v2/all')      
      .then(response => {        
        console.log('maat saatu')        
        setCountries(response.data)      
      })  
    }, [])  




  if (matches.length === 1) {
    return (
      <div>
        <Filter value = {newFilter} handler = {handleFilterChange}/>
        <Country country = {matches[0]} api_key={api_key} set={setWeather} weather={weather}/>
      </div>
    )
  } else if (matches.length < 11) {
    return (
      <div>
        <Filter value = {newFilter} handler = {handleFilterChange}/>
        <Countries countries = {matches} setfilter={setNewFilter}/>
      </div>
    )
  } else {
    return (
      <div>
        <Filter value = {newFilter} handler = {handleFilterChange}/>
        <Toomany />
      </div>
    )
  }

}

export default App