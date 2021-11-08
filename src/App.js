import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setInfoNotification } from './reducers/notificationReducer'
import { restoreUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setInfoNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const createNewBlogForm = () => (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  useEffect(() => {
    // Get bloglist
    dispatch(initializeBlogs())

    // Get userinfo from local storage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(restoreUser(user))
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm/> :
        <div>
          <LogoutForm/>
          <p>{user.name} logged in</p>
          {createNewBlogForm()}
          <Blogs />
        </div>
      }
    </div>
  )
}

export default App