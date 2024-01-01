import { useDispatch, useSelector } from 'react-redux'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate, useParams } from 'react-router-dom'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((blog) => blog.id === id)
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  if (!blog) return null

  const showWhenOwner = {
    display: user.username === blog.user.username ? '' : 'none'
  }

  const handleComment = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    dispatch(addComment(blog.id, comment))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    try {
      dispatch(deleteBlog(blog.id))
      dispatch(
        setNotification({
          class: 'notification',
          message: `Blog '${blog.title}' deleted`
        })
      )
    } catch (exception) {
      dispatch(setNotification({ class: 'error', message: 'Deletion failed' }))
    }
    navigate('/')
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <button onClick={handleLike}>Like</button>
      </div>
      <div>Added by {blog.user.name}</div>
      <div style={showWhenOwner}>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <h4>Comments</h4>
      <form onSubmit={handleComment}>
        <input name="comment"></input>
        <button type="submit">Add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogDetails
