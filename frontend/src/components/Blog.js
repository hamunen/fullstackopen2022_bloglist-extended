import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import { BlogTitle } from '../styles'

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

  const [comment, setComment] = useState('')

  const handleCommentSubmit = (event) => {
    event.preventDefault()
    //dispatch(loginUser({ username, password }))
    dispatch(commentBlog(blog.id, comment))
    setComment('')
  }

  const commentForm = () => (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleCommentSubmit}>
        <input
          id='comment'
          type='text'
          value={comment}
          name='comment'
          placeholder='comment...'
          autoComplete='off'
          onChange={({ target }) => setComment(target.value)}
        />
        <button id='comment-submit' type='submit'>
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )

  if (!blog) {
    return null
  }

  return (
    <div>
      <BlogTitle>{blog.title}</BlogTitle>
      by {blog.author}
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
      {commentForm()}
    </div>
  )
}

export default Blog
