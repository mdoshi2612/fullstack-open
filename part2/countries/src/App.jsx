import { useState, useEffect } from 'react'
import getCountriesList from './services/getCountries'
import CountryList from './components/CountryList'

function App() {
  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    getCountriesList().then((response) => setAllCountries(response))
  }, [])

  const handleCountryChange = (e) => {
    setCountry(e.target.value)
    const regex = new RegExp(e.target.value, 'i')
    setCountryList(
      allCountries.filter((country) => regex.test(country.name.common))
    )
  }

  return (
    <>
      <div>
        find country <input value={country} onChange={handleCountryChange} />
      </div>
      <div style={{ marginTop: '1rem' }}>
        {country !== '' && <CountryList countryList={countryList} />}
      </div>
    </>
  )
}

export default App
