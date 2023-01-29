import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ currentUser }) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={currentUser} />
      ))}
    </div>
  )
}

export default BlogList
