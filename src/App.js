import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { setInfoNotification } from './reducers/notificationReducer'
import { loginUser, logoutUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setInfoNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5))
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button id="logout-button" type="submit">logout</button>
    </form>
  )

  const createNewBlogForm = () => (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  useEffect(() => {
    // Get bloglist
    dispatch(initializeBlogs())

    // Get userinfo from local storage
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(loginUser(user))
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          {logoutForm()}
          <p>{user.name} logged in</p>
          {createNewBlogForm()}
          <Blogs />
        </div>
      }
    </div>
  )
}

export default App