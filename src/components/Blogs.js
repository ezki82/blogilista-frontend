import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blog)
  return (
    <div>
      <h2>Blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
    </div>
  )
}

export default Blogs