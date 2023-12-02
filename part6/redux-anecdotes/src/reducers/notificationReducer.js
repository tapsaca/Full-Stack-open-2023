import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return null
    }
  }
})

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds * 1000)
  }
}

export const { showNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer