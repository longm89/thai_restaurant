import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const createUser = async newUser => {

  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getOrders = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(`${baseUrl}/${id}/orders`, config)
  return request.then(response => response.data)
}

export default {
  getAll, createUser, getOrders, setToken
}