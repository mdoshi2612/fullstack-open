const Filter = ({ filteredName, onChange }) => {
  return (
    <p>
      filter shown with <input value={filteredName} onChange={onChange} />
    </p>
  )
}

export default Filter
