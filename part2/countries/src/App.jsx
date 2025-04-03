import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Result = ({countries}) => {
  const result = countries.map( country => <li key={country.name.common}>{country.name.common}</li>)

  if (result.length > 10)
    return<div>Too many matches, specify another filter</div>
  if (result.length === 1){
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
  return (
    <div>
      {result}
    </div>
    )
}

function App() {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countriesService
      .getAll()
      .then(res => {
        setCountries(res)
        console.log(res);
      })
  },[])

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <>
    <label>find countries <input value={newFilter} onChange={({target}) => setNewFilter(target.value)}/></label>
    {newFilter && <Result countries={filteredCountries} />}
    </>
  )
}

export default App
