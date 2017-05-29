import React from 'react';

/**
* Movie component - renders a list item for a movie 
* @param   {string} title    movie title
* @param   {string} release_date    movie release date
* @return {ReactComponent}  renders a link to a details page for the movie
*/
const Movie = ({ title, release_date}) => (
  <li className="movie-list__item">
      {title} - Release date: {release_date}
  </li>
)

export default Movie;
