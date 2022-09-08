import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const deleteButton = () => {
    if (blog.user.username === currentUser)
      return (
        <div>
          <button
            data-test-id='removeBtn'
            onClick={() => handleDelete(blog.id)}
          >
            remove
          </button>{' '}
        </div>
      )
  }

  const blogDetails = () => (
    <div>
      <div>{blog.url}</div>
      <div>
        likes: {blog.likes}{' '}
        <button data-test-id='likeBtn' onClick={() => handleLike(blog.id)}>
          like
        </button>{' '}
      </div>
      <div>{blog.user.name}</div>
      {deleteButton()}
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} &nbsp;
      <button onClick={() => setViewDetails(!viewDetails)}>
        {viewDetails ? 'hide' : 'view'}
      </button>
      {viewDetails && blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
}

export default Blog
