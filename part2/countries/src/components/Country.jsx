const Country = ({ country, onClick }) => {
  return (
    <>
      {' '}
      {country.name.common}
      <button onClick={onClick}>Show</button>
      <br />
    </>
  )
}

export default Country
