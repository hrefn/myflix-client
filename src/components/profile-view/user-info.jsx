import React from 'react'

export function UserInfo({ user }) {
  return (
    <>
      <h4>Your Info</h4>
      <p>Username: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthday: {user.Birthday}</p>
    </>
  )
}
