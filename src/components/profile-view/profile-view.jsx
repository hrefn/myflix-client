import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Col, Container, Row } from 'react-bootstrap';

import { UpdateView } from "./update-view";
import { MovieCard } from "../movie-card/movie-card";

import './profile-view.scss';


export function ProfileView (props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://myflix-db-54469.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavoriteMovies(response.data.FavoriteMovies);
    })
    .catch(error => {
      console.error(error)
    })
  }

  const getMovies = () => {
    axios.get('https://myflix-db-54469.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      let data = response.data;
      setMovies(data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  const renderFavorites = () => {
    if (movies.length === 0) return <div className="main-view" />

    return (
      <Row className="justify-content-md-center">
        {favoriteMovies.length === 0 ? (<p>You don't have any favorite movies</p>) : (
          favoriteMovies.map((movie) => (
            <Col md={6} lg={4} key={movie}>
              <MovieCard movie={movies.find(m => m._id == movie)} />
            </Col>
          ))
        )}
      </Row>
    )
  }

  useEffect(() => {
    getUser();
    getMovies();
  }, [])

  const handleDelete = () => {
    axios.delete(`https://myflix-db-54469.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The account ${user.Username} was successfully deleted`);
      localStorage.clear();
      window.open('/register', '_self');
    })
    .catch(error => {
      console.error(error)
    })
  }

  return (
    <Container id="profile-view">
      <Row><h4>{user.Username}</h4></Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
      </Row>
      <Row>
        <Col className="label">Password:</Col>
        <Col className="value">****</Col>
      </Row>
      <Row>
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
      </Row>
      <Row>
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
      </Row>
      <Row>
        <Col className="label">Favorite Movies:</Col>
      </Row>
      {renderFavorites()}
      <UpdateView user={user} />
      <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete Profile</Button>
    </Container>
  )
}