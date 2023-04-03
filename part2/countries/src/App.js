import { useEffect, useState } from 'react'
import Countries from './components/Countries'
import countryService from './services/countries'
import Search from './components/Search'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
      })
  }, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <Search filter={filter} onChange={handleChange} />
      {filter ? <Countries countries={countries} filter={filter} setFilter={setFilter} /> : null}
    </div>
  )
}

export default App