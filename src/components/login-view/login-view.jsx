import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView (props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');  
  // const { setRegistration } = props.setRegistration;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="Text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId='formPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      <Button onClick={() => { props.onRegistrationClick(true) }}>Register</Button>
    </Form>
  );
}