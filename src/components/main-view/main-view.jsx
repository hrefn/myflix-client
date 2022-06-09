import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import Row from 'react-bootstrap/Row';
import { Col } from 'react-bootstrap';

export class MainView extends React.Component {

  constructor () {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registration: false
    }
  }

  componentDidMount () {
    axios.get('https://myflix-db-54469.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  setRegistration (status) {
    this.setState({
      registration: status
    })
  } 

  onLoggedIn (user) {
    this.setState({
      user
    });
  }


  render () {
    const { movies, selectedMovie, user, registration } = this.state;

    if (!user) return (
      <div className='login-view'>
        {registration
          ? <RegistrationView onRegistrationClick={status => { this.setRegistration(status) }} />
          : <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegistrationClick={status => { this.setRegistration(status) }} />
        }
      </div>
    );

    if (movies.length === 0) return <div className='main-view' />;

    return (
      <Row className='main-view justify-content-md-center'>
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
            : movies.map(movie => (
              <Col md={3}>
                <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              </Col>
              ))
          }
      </Row>
    );
    }
  }