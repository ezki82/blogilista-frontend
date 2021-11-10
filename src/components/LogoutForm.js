import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = () => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
    history.push('/')
  }
  return (
    <form onSubmit={handleLogout}>
      <button id="logout-button" type="submit">logout</button>
    </form>
  )
}

export default LogoutForm