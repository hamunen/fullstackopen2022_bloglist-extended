import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

//import blogService from './services/blogs'
//import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'
import { initializeUser, logoutUser } from './reducers/userReducer'

const App = () => {
  //const [blogsOld, setBlogs] = useState([])
  //const [user, setUser] = useState(null)

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const updateMessage = (text, error = false) => {
    dispatch(setNotification(text, error))
  }

  const handleLogout = () => {
    dispatch(logoutUser())
    updateMessage('Logged out. Bye!')
  }

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()

    try {
      dispatch(createBlog(blog))
      updateMessage(`New blog "${blog.title}" added!`)
    } catch (error) {
      updateMessage(error.response.data.error, true)
    }
  }

  const handleLike = async (id) => {
    try {
      dispatch(likeBlog(id))
    } catch (error) {
      updateMessage(error.response.data.error, true)
    }
  }

  const handleDelete = async (id) => {
    try {
      const blogToDelete = blogs.find((b) => b.id === id)

      if (
        !window.confirm(
          `Do you REALLY want to remove blog ${blogToDelete.title} from the wonderful ${blogToDelete.author}?? Sure?`
        )
      ) {
        return
      }

      dispatch(deleteBlog(id))
      updateMessage(`blog ${blogToDelete.title} deleted!`)
    } catch (error) {
      updateMessage(error.response.data.error, true)
    }
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
        {user.name} is logged in <button onClick={handleLogout}>logout</button>
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
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
            currentUser={user.username}
          />
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
