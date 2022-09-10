import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} is logged in{' '}
        <button onClick={() => dispatch(logoutUser())}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} currentUser={user.username} />
        ))}
      </div>
    )
  }

  return user === null ? (
    loginForm()
  ) : (
    <div>
      {blogForm()}
      <br />
      {blogList()}
    </div>
  )
}

export default App
