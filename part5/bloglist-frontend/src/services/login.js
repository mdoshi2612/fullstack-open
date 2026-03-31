import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login/'

const loginService = async ({ username, password }) => {
  const result = await axios.post(baseUrl, { username, password })
  return result
}

export default loginService
