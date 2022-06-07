import React from 'react';

export function RegistrationView (props) {
  return (
    <form>
      <label>
        Username: 
        <input type="text" />
      </label>
      <label>
        Password: 
        <input type="password" />
      </label>
      <label>
        Confirm Password: 
        <input type="password" />
      </label>
      <button type='submit'>Submit</button>
      <button onClick={() => { props.onRegistrationClick(false) }}>Back</button>
    </form>
  )
}