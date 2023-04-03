import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const WeatherData = ({ capital }) => {
  const [capitalWeather, setCapitalWeather] = useState(null)

  useEffect(() => {
    weatherService
      .getCityWeather(capital)
      .then(weather => {
        setCapitalWeather(weather)
      })
  }, [])

  if (!capitalWeather) {
    return null
  }
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {capitalWeather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@2x.png`}
        alt={`Icon for ${capitalWeather.weather[0].description}`} 
      />
      <p>wind {capitalWeather.wind.speed} m/s</p>
    </div>
  )
}

export default WeatherData