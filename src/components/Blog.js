import React, { useState } from 'react'
const Blog = ({ blog, user, addLike, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const _addLike = () => {
    addLike(blog)
  }

  const _removeBlog = () => {
    removeBlog(blog)
  }

  const hideDetailsVisible = { display: detailsVisible ? 'none' : '' }
  const showDetailsVisible = { display: detailsVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div style={hideDetailsVisible}>
        <h4>{blog.title} {blog.author}</h4> <button onClick={toggleDetails}>show details</button>
      </div>
      <div style={showDetailsVisible}>
        <h4>{blog.title} {blog.author}</h4> <button onClick={toggleDetails}>hide details</button> <br/>
        <p>
          url:{blog.url} <br/>
          likes: {blog.likes} <button onClick={_addLike}>like</button> <br/>
          added by: {blog.user.name} <br/>
          {blog.user.username === user.username ? <button onClick={_removeBlog}>remove</button> : <></>}
        </p>
      </div>
    </div>
  )
}

export default Blog