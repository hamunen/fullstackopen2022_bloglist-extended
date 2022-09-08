import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addNote = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <label htmlFor='titleInput'>title: </label>
          <input id='titleInput' value={newTitle} onChange={({ target }) => setNewTitle(target.value)} /></div>
        <div>
          <label htmlFor='authorInput'>author: </label>
          <input id='authorInput' value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} /></div>
        <div>
          <label htmlFor='urlInput'>url: </label>
          <input id='urlInput' value={newUrl} onChange={({ target }) => setNewUrl(target.value)} /></div>

        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm