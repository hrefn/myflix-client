import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Col, Container, Row, Card } from 'react-bootstrap';

import { UpdateView } from "./update-view";
import { UserInfo } from "./user-info";
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
      <Row className="justify-content-start">
        {favoriteMovies.length === 0 ? (<p>You don't have any favorite movies</p>) : (
          favoriteMovies.map((movie) => (
            <Col md={6} lg={4} key={movie} className="h-100">
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
      <Row id="profile-info">
        <Col xs={12} sm={4} className="align-items-stretch">
          <Card bg="dark" text="light">
            <Card.Body>
              <UserInfo user={user} />
            </Card.Body>
          </Card>
        </Col>
        <Col sm={8} className="align-items-stretch">
          <Card bg="dark" text="light">
            <Card.Body>
              <h4>Edit Profile</h4>
              <UpdateView user={user} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <h4>Favorite Movies:</h4>
        {renderFavorites()}
      </Row>
      <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete Profile</Button>
    </Container>
  )
}