import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.type === 'info') {
    return (
      <div className="info">
        {message.content}
      </div>
    )
  }

  if (message.type === 'error') {
    return (
      <div className="error">
        {message.content}
      </div>
    )
  }

  return (
    <div>
      {message.content}
    </div>
  )

}

export default Notification