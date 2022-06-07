import React from 'react';

export class MovieView extends React.Component {

  keypressCallback (event) {
    console.log(event.key);
  }

  componentDidMount () {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount () {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render () {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movie.ImagePath} />
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
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </div>
    );
  }
}