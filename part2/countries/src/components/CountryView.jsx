const CountryView = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>
        Capital {country.capital[0]} <br /> Area {country.area}
      </p>
      <h1>Languages Spoken</h1>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
    </>
  )
}

export default CountryView
