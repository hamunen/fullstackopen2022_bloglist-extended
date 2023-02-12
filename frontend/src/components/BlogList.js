import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { createBlog } from '../reducers/blogReducer'
import { BlogContainer, BlogLink, SmallText } from '../styles'

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

  return (
    <div>
      {blogForm()}
      <br />
      {blogs.map((blog) => (
        <BlogLink key={blog.id} to={`/blogs/${blog.id}`}>
          <BlogContainer>
            <b>{blog.title}</b> <SmallText>by {blog.author}</SmallText>
          </BlogContainer>
        </BlogLink>
      ))}
    </div>
  )
}

export default BlogList
