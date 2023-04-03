import axios from 'axios'

const baseURL = 'https://api.openweathermap.org/data/2.5/'
const api_key = process.env.REACT_APP_WEATHER_API_KEY

const getCityWeather = (city) => {
  const request = axios.get(`${baseURL}/weather?q=${city}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { getCityWeather }