import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCountry = (name) => {
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name) {
      axios.get(`${baseUrl}/${name}`)
        .then((response) => setCountry({
          data: {
            name: response.data.name.common,
            capital: response.data.capital,
            population: response.data.population,
            flag: response.data.flags.png
          },
          found: true
        }))
        .catch(() => setCountry({ found: false }))
    }
  }, [name])

  return country
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}