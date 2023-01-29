import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { Routes, Route, Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'
import BlogList from './components/BlogList'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user.currentUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )

  return user === null ? (
    loginForm()
  ) : (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is logged in{' '}
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>

      <Routes>
        <Route path='/' element={<BlogList currentUser={user.username} />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
