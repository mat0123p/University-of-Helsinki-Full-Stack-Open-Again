import axios from 'axios'
import { useState, useEffect } from 'react'

const ShowCountry = ({countriesToShow}) => {
  return(
    countriesToShow.map(country => 
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>
        <div>Capital {country.capital[0]}</div>
        <div>Area {country.area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img src={country.flags.png} alt={country.name.common} width="180" height="100"/>
        <h2>Weather in {country.capital[0]}</h2>

      </div>
  ))
}

const ShowCountries = ({countriesToShow, setNewFilter}) => {
  return(
    countriesToShow.map(country =>
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => setNewFilter(country.name.common)}>show</button>
      </div>
  ))
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })}, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const countriesToShow = newFilter === '' ?
    countries:
    countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));

  return (
    <div>
      <form>
        <div>
          find countries <input 
          value = {newFilter}
          onChange={handleFilterChange}
          />
        </div>
      </form>
      <div>
        {
          countriesToShow.length < 10 && countriesToShow.length > 1 && (<ShowCountries countriesToShow={countriesToShow} setNewFilter={setNewFilter} />)
        }
        {
          countriesToShow.length > 10 && <div>Too many matches, specify another filter</div>
        }
        {
          countriesToShow.length === 1 && (<ShowCountry countriesToShow={countriesToShow} />)
        }
      </div>
    </div>
  )
}

export default App
