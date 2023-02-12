import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
    try {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification(`New blog "${newBlog.title}" added!`))
      return newBlog
    } catch (error) {
      console.log(error)
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    //äh, pitäiskö like logiikka olla tässä vai servicessä?? anekdooteissa on servicessä
    try {
      const likedBlog = await blogService.like(id)
      dispatch(updateBlog(likedBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blogToDelete.id)
      dispatch(removeBlog(blogToDelete.id))
      dispatch(setNotification(`blog ${blogToDelete.title} deleted!`))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.comment(id, comment)
      dispatch(updateBlog(commentedBlog))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, true))
    }
  }
}

export default blogSlice.reducer
