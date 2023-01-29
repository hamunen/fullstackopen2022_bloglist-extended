import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'

const BlogList = ({ currentUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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

  return (
    <div>
      {blogForm()}
      <br />
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default BlogList
