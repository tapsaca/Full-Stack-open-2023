import axios from 'axios'
const baseURL = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseURL, newObject, config)
  return response.data
}

const deleteObject = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseURL}/${id}`, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseURL}/${id}`, newObject)
  return response.data
}

export default { getAll, create, deleteObject, setToken, update }
