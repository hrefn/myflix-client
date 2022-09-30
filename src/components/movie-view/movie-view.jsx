import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button'
import { Route, Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }
  
  getUser () {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token')

    axios.get(`https://myflix-db-54469.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        Username: response.data.Username,
        Password: response.data.Password,
        Email: response.data.Email,
        Birthday: response.data.Birthday,
        FavoriteMovies: response.data.FavoriteMovies
      })
    })
    .catch(error => {
      console.error(error)
    })
  }

  componentDidMount () {
    this.getUser()
  }

  addFavoriteMovie = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token')
    let favoriteMovies = this.state.FavoriteMovies;
    let isFav = favoriteMovies.includes(this.props.movie._id);

    if (!isFav) {
      axios.post(`https://myflix-db-54469.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(response => {
        console.log(response.data);
        window.open(`/movies/${this.props.movie._id}`, '_self');
      })
      .catch(error => {
        console.error(error)
      });
    } else if (isFav) {
      alert(`${this.props.movie.Title} is already favorited`)
    }
  }

  deleteFavoriteMovie = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios.delete(`https://myflix-db-54469.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      console.log(response.data);
      alert(`${this.props.movie.Title} has been unfavorited`)
      window.open(`/movies/${this.props.movie._id}`, '_self');
    })
    .catch(error => {
      console.error(error);
    });
  }

  render () {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies, Username, Password, Email, Birthday } = this.state;
    let favoriteMovies = this.state.FavoriteMovies;
    let isFav = favoriteMovies.includes(this.props.movie._id);

    return (
      <div className='movie-view'>
        <div className='movie-poster-container' style={{textAlign: 'center'}} >
          <img className='movie-poster' crossOrigin='anonymous' src={movie.ImagePath} style={{  height: 'auto', width: 'auto', 'max-width': '500px', 'max-height': '500px'}} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description: </span>
          <span className='value'>{movie.Description}</span>
        </div>
        <div className='movie-director'>
          <span>Director: </span>
          <span>{movie.Director.Name} ({movie.Director.Birth} - {movie.Director.Death})</span>
          <div>
            <span>Bio: </span>
            <span>{movie.Director.Bio}</span>
          </div>
        </div>
        <div className='move-genre'>
          <span>Genre: </span>
          <span>{movie.Genre.Name} </span>
          <div>
            <span>Genre Description: </span>
            <span>{movie.Genre.Description}</span>
          </div>
        </div>
        <Link to={`genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Button onClick={() => { onBackClick(); }}>Back</Button>
        
        {!isFav && (
          <Button className="add-list__button" variant="warning" onClick={this.addFavoriteMovie}>Add to Favorites</Button>
        )}
        {isFav && (
          <Button className="add-list__button" variant="warning" onClick={this.deleteFavoriteMovie}>Unfavorite</Button>
        )}
      </div>
    );
  }
}