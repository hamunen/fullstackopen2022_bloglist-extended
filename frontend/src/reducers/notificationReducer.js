import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    updateNotification(state, action) {
      return action.payload
    },
  },
})

export const { updateNotification } = notificationSlice.actions

export const setNotification = (text, error = false) => {
  return async (dispatch, getState) => {
    /* if existing notification, clear the timeout */
    const existingNotification = getState().notification
    clearTimeout(existingNotification?.timeoutId)

    const timeoutId = setTimeout(() => {
      dispatch(updateNotification(null))
    }, 5000)
    dispatch(updateNotification({ text, error, timeoutId }))
  }
}

export default notificationSlice.reducer
