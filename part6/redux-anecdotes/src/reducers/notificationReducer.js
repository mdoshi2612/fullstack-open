import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

const { setNotification } = notificationSlice.actions

export const displayNotification = (message, duration) => (dispatch) => {
  dispatch(setNotification(message))
  setTimeout(() => {
    dispatch(setNotification(''))
  }, duration * 1000)
}

export default notificationSlice.reducer
