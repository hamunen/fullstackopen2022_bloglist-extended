import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setLikes(state, action) {
      const id = action.payload
      const blogtoChange = state.find((a) => a.id === id)
      const changedblog = {
        ...blogtoChange,
        likes: blogtoChange.likes + 1,
      }
      return state.map((a) => (a.id !== id ? a : changedblog))
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload
      return state.map((a) =>
        a.id !== updatedAnecdote.id ? a : updatedAnecdote
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
