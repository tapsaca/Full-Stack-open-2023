import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    }
  }
})

export const createBlog = (blog, user) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blog)
    addedBlog.user = { name: user.name, username: user.username }
    dispatch(addBlog(addedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteObject(id)
    dispatch(removeBlog(id))
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
    likedBlog.user = { name: blog.user.name, username: blog.user.username }
    dispatch(updateBlog(likedBlog))
  }
}

export const { addBlog, removeBlog, setBlogs, updateBlog } = blogSlice.actions
export default blogSlice.reducer
