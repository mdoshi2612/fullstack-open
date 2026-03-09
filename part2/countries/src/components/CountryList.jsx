import { useState } from 'react'
import Country from './Country'
import CountryView from './CountryView'

const CountryList = ({ countryList }) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  if (countryList.length > 10) return <p>Too many countries</p>
  if (countryList.length === 1) return <CountryView country={countryList[0]} />
  if (selectedCountry) return <CountryView country={selectedCountry} />

  return (
    <>
      {countryList.map((country) => (
        <Country
          key={country.name.common}
          country={country}
          onClick={() => setSelectedCountry(country)}
        />
      ))}
    </>
  )
}
export default CountryList
