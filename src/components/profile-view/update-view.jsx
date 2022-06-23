import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './profile-view.scss'

export function UpdateView(props) {
  const { user } = props;
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    console.log(user.Username, username, password, email, birthday)

    axios.put(`https://myflix-db-54469.herokuapp.com/users/${user.Username}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    },
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data);
      localStorage.setItem('user', response.data.Username);
      window.open(`${username}`, '_self');
    })
    .catch(error => {
      console.error(error)
    });
  }

  return (
    <Container id="update-view" className="mt-5">
      <Row><h4>Edit Profile</h4></Row>
      <Row>
        <Col sm="10" md="8" lg="6">
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="Email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Button variant="warning" type="submit" onClick={handleSubmit}>Edit Profile</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}