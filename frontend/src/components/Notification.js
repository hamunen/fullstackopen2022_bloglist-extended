import React from 'react'

const Notification = ({ notification }) => {
  const successStyle = {
    color: 'green',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const errorStyle = {
    color: 'red',
    fontSize: 16,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification === null) return null
  const style = notification.error ? errorStyle : successStyle
  const messageClass = notification.error ? 'error' : 'message'

  return (
    <div style={style} className={messageClass}>
      {notification.text}
    </div>
  )
}

export default Notification
