import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, currentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (
      window.confirm(
        `Do you REALLY want to remove blog ${blog.title} from the wonderful ${blog.author}?? Sure?`
      )
    ) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const deleteButton = () => {
    if (blog.user.username === currentUser.username)
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

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>
        {blog.title} - by {blog.author}
      </h1>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes{' '}
        <button
          data-test-id='likeBtn'
          onClick={() => dispatch(likeBlog(blog.id))}
        >
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      {deleteButton()}
    </div>
  )
}

export default Blog
