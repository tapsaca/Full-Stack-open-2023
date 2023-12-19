import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    }
  }
})

export const addBlog = (blog, user) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blog)
    addedBlog.user = { name: user.name, username: user.username }
    dispatch(appendBlog(addedBlog))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const { appendBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
