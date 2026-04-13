import { useDispatch } from 'react-redux'
import { handleChange } from '../reducers/filterReducer'

const Filter = () => {
  const style = {
    marginBottom: 10,
  }

  const dispatch = useDispatch()

  return (
    <div style={style}>
      filter{' '}
      <input
        onChange={(event) => {
          dispatch(handleChange(event.target.value))
        }}
      />
    </div>
  )
}

export default Filter
