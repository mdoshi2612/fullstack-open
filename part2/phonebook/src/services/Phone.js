import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

export const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

export const addNewPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((response) => response.data)
}

export const deletePerson = (id) => {
  console.log(`Deleting id ${id}`)
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data)
}

export const putPerson = (id, newPerson) => {
  return axios
    .put(`${baseUrl}/${id}`, newPerson)
    .then((response) => response.data)
}
