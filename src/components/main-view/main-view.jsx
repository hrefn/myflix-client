import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import './main-view.scss';

import MoviesList from '../movies-list/movies-list'

class MainView extends React.Component {


  getMovies(token) {
    axios.get('https://myflix-db-54469.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount () {
    let accessToken = localStorage.getItem('token');
    if (accessToken != null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  onLoggedIn (authData) {
    setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    window.open('/', '_self');
  }

  onLoggedOut () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('')
  }

  render () {
    let { movies, user } = this.props;

    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center" mt="2">
          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <MoviesList movies={movies} />
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col lg={8} md={8}>
              <RegistrationView />
            </Col>
          }} />

          <Route exact path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col> 
          }} />

          <Route exact path="/movies/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path={`/users/${user}`} render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => { history.goBack() }} />
            </Col>
          }} />

          {/* <Route path={`/user-update/${user}`} render={({ match, history }) => {
            if (!user) return <Redirect to="/" />
            return <Col>
              <UserUpdate user={user} onBackClick={() => history.goBack() } />
            </Col>
          }} /> */}
          
        </Row>
      </Router>
    );
    
  }
}

let mapStateToProps = state => {
  return { 
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);