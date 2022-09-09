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
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((a) => (a.id !== updatedBlog.id ? a : updatedBlog))
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const removedId = action.payload
      return state.filter((b) => b.id !== removedId)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    return newBlog
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    //äh, pitäiskö like logiikka olla tässä vai servicessä?? anekdooteissa on servicessä
    const likedBlog = await blogService.like(id)
    dispatch(updateBlog(likedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer
