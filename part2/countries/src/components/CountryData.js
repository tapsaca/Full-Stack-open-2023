import WeatherData from "./WeatherData"

const CountryData = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <WeatherData capital={country.capital[0]} />
    </div>
  )
}

export default CountryData