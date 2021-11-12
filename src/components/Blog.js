import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {

  if (!blog) {
    return null
  }
  const dispatch = useDispatch()
  const _addLike = () => {
    dispatch(likeBlog(blog))
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <Link to={blog.url}>{blog.url}</Link>
      <p>{blog.likes} likes <button onClick={_addLike}>like</button><br></br>
      added by {blog.user.name}</p>
    </div>
  )
}

export default Blog