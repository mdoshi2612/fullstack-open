import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'

const getCountriesList = () => {
  return axios.get(`${baseUrl}/api/all`).then((response) => response.data)
}

export default getCountriesList
