import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = ({ currentUser, blogs }) => {
  const dispatch = useDispatch()

  const addBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blog))
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    </div>
  )

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} className='blog'>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - by {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
