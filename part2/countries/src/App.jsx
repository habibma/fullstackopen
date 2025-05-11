import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Result = ({countries, country, handleShowCountry , ShowCountry}) => {

  if (countries.length > 10)
    return<div>Too many matches, specify another filter</div>
  else if (countries.length === 1){
    const country = countries[0]
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          { Object.values(country.languages).map(value => <li key={value}>{value}</li>) }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    )
  }

  if (ShowCountry && countries.length > 1){
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          { Object.values(country.languages).map(value => <li key={value}>{value}</li>) }
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    )
  }

  const result = countries.map(country => <li key={country.name.common}>{country.name.common} <button onClick={() => handleShowCountry(country.name.common)}>Show</button></li>)

  return (
    <div>
      {result}
    </div>
    )
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState([])
  const [ShowCountry, setShowCountry] = useState(false)

  useEffect(() => {
    countriesService
      .getAll()
      .then(res => {
        setCountries(res)
      })
  },[])

  const handleFilter = ({target}) => {
    setNewFilter(target.value)
    setShowCountry(false);
  }

  const handleShowCountry = (name) => {
    countriesService
      .get(name)
      .then(res => {
        setCountry(res)
        setShowCountry(!ShowCountry)
      })
  }

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
    <label>find countries <input value={newFilter} onChange={handleFilter}/></label>
    {newFilter && <Result countries={filteredCountries} country={country} handleShowCountry={handleShowCountry} ShowCountry={ShowCountry} />}
    </>
  )
}

export default App
