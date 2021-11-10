import React, { useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { restoreUser } from './reducers/userReducer'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'

const App = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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
      <div>
        <Notification />
        {user === null ?
          <LoginForm /> :
          <div>
            <Link className='link' to="/users">users</Link>
            <Link className='link' to="/blogs">blogs</Link>
            <p>{user.name} logged in</p>
            <LogoutForm />
          </div>}
      </div>
      <Switch>
        <Route path='/users'>
          <UserDetails />
        </Route>
        <Route path='/blogs'>
          <Blogs />
          <BlogForm />
        </Route>
      </Switch>
    </div>
  )
}

export default App