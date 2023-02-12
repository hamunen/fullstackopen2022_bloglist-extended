import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import { Routes, Route, useMatch, Link } from 'react-router-dom'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { Page, Navigation, NavbarDivider, StyledButton } from './styles'

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
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
    dispatch(initializeUsers())
  }, [dispatch])

  const userMatch = useMatch('/users/:id')
  const navigatedUser = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  const navigatedBlog = blogMatch
    ? blogs.find((user) => user.id === blogMatch.params.id)
    : null

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )

  const navBar = () => (
    <>
      <Navigation>
        <h2>THE BLOG APP</h2>
        <Link to='/'>blogs</Link>
        <Link to='/users'>users</Link>
        {currentUser != null && (
          <span>
            {currentUser.name} logged in{' '}
            <StyledButton onClick={() => dispatch(logoutUser())}>
              logout
            </StyledButton>
          </span>
        )}
      </Navigation>
      <NavbarDivider />
    </>
  )

  return (
    <Page>
      {navBar()}
      {currentUser === null ? (
        loginForm()
      ) : (
        <div>
          <Notification />
          <Routes>
            <Route
              path='/'
              element={
                <BlogList blogs={blogs} currentUser={currentUser.username} />
              }
            />
            <Route path='/users' element={<Users users={users} />} />
            <Route path='/users/:id' element={<User user={navigatedUser} />} />
            <Route
              path='/blogs/:id'
              element={<Blog blog={navigatedBlog} currentUser={currentUser} />}
            />
          </Routes>
        </div>
      )}
    </Page>
  )
}

export default App
