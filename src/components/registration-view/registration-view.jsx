import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function RegistrationView (props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confPassword, setConfPassword ] = useState('');

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formConfirmPassword">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control type="password" onChange={e => setConfPassword(e.target.value)} />
      </Form.Group>
      <Button onClick={() => { props.onRegistrationClick(false) }}>Submit</Button>
      <Button onClick={() => { props.onRegistrationClick(false) }}>Back</Button>
    </Form>
  )
}