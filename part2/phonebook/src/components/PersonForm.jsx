const PersonForm = ({
  handleFormSubmit,
  newName,
  handleNameChange,
  newPhoneNumber,
  handlePhoneNumberChange,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <p>
          name: <input value={newName} onChange={handleNameChange} />
        </p>
        <p>
          phone:{' '}
          <input value={newPhoneNumber} onChange={handlePhoneNumberChange} />
        </p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
