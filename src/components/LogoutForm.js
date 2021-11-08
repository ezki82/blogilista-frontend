import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'

const LogoutForm = () => {

  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  }
  return (
    <form onSubmit={handleLogout}>
      <button id="logout-button" type="submit">logout</button>
    </form>
  )
}

export default LogoutForm