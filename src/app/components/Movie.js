import React from 'react';
import { Link } from 'react-router-dom';

/**
* Movie component - renders a list item for a movie with a link
* @param   {string} title    movie title
* @param   {string} release_date    movie release date
* @param   {string} id    movie id from the movie database
* @return {ReactComponent}  renders a link to a details page for the movie
*/
const Movie = ({ title, release_date, id }) => (
  <li className="movie-list__item">
    <Link className="movie-list__item__link"
          to={`/movie/details/${id}`}>
      {title} - Release date: {release_date}
    </Link>
  </li>
)

export default Movie;
