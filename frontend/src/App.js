import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import {
  initializeUser,
  logoutUser,
  initializeUsers,
} from './reducers/userReducer'

import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()

  const currentUser = useSelector((state) => state.user.currentUser)
  const users = useSelector((state) => state.user.users)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const match = useMatch('/users/:id')
  const navigatedUser = match
    ? users.find((user) => user.id === match.params.id)
    : null

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )

  return currentUser === null ? (
    loginForm()
  ) : (
    <div>
      <h2>blogs</h2>
      <p>
        {currentUser.name} is logged in{' '}
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>

      <Routes>
        <Route
          path='/'
          element={<BlogList currentUser={currentUser.username} />}
        />
        <Route path='/users' element={<Users users={users} />} />
        <Route path='/users/:id' element={<User user={navigatedUser} />} />
      </Routes>
    </div>
  )
}

export default App
