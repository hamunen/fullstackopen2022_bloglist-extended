import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: { currentUser: null, users: [] },
  reducers: {
    setUser(state, action) {
      return { ...state, currentUser: action.payload }
    },
    setUsers(state, action) {
      return { ...state, users: action.payload }
    },
  },
})

export const { setUser, setUsers } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch(setUsers(users))
  }
}

export const loginUser = (loginUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(loginUser)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification(`Logged in. Hello ${user.name}!`))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('Invalid username or password', true))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
    dispatch(setNotification('Logged out. Bye!'))
  }
}

export default userSlice.reducer
