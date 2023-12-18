import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  class: null,
  message: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    removeNotification() {
      return initialState
    }
  }
})

export const setNotification = (notification) => {
  return async (dispatch) => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 3000)
  }
}

export const { showNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
