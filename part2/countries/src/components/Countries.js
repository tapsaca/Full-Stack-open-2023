import CountryData from './CountryData'

const Countries = ({ countries, filter, setFilter }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries
          .map(country =>
            <div key={country.cca2}>
              {country.name.common} <button onClick={() => setFilter(country.name.common)}>show</button>
            </div>
          )
        }
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        <CountryData country={filteredCountries[0]} />
      </div>
    )
  }
}

export default Countries