import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateMessage = (text, error = false) => {
    setMessage({ text, error })
    setTimeout(() => setMessage(null), 5000)
  }

  const handleLogin = async (loginUser) => {
    try {
      const user = await loginService.login(loginUser)

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      updateMessage(`Logged in. Hello ${user.name}!`)
    } catch (exception) {
      console.log(exception)
      updateMessage('Invalid username or password', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    updateMessage('Logged out. Bye :\')')
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blog)
      setBlogs(blogs.concat(returnedBlog))
      updateMessage(`New blog "${returnedBlog.title}" added!`)
    } catch (error) {
      updateMessage(error.response.data.error, true)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(likedBlog)
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog))
    } catch(error) {
      updateMessage(error.response.data.error, true)
    }
  }

  const handleDelete = async (id) => {
    try {
      const blogToDelete = blogs.find(b => b.id === id)

      if (!window.confirm(`Do you REALLY want to remove blog ${blogToDelete.title} from the wonderful ${blogToDelete.author}?? Sure?`)) {
        return
      }

      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id !== id))
      updateMessage(`blog ${blogToDelete.title} deleted!`)
    } catch (error) {
      updateMessage(error.response.data.error, true)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification notification={message} />
      <LoginForm handleLogin={handleLogin}
      />
    </div>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification notification={message} />
      <p>{user.name} is logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )

  const blogList = () => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
    return (
      <div>
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={user.username}/>
        )}
      </div>
    )
  }


  return user === null ?
    loginForm() :
    <div>
      {blogForm()}
      <br />
      {blogList()}
    </div>
}

export default App