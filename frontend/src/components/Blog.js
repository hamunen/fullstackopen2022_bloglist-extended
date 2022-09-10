import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, currentUser }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        `Do you REALLY want to remove blog ${blog.title} from the wonderful ${blog.author}?? Sure?`
      )
    ) {
      dispatch(deleteBlog(blog))
    }
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
        <button
          data-test-id='likeBtn'
          onClick={() => dispatch(likeBlog(blog.id))}
        >
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
  currentUser: PropTypes.string.isRequired,
}

export default Blog
