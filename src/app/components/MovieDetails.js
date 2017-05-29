import React from 'react';
import Loader from './Loader';
import {getItemFromLocalStorage, setItemInLocalStorage, fetchData} from './Store';

/**
  * apiKey used for fetching data from the movie database
  * @type {string}
*/
const apiKey = "67b83f40bf6d1ea049594f29548af7dc";
/**
  * MovieDetails class for displaying the details of a movie from the database
  * @class
*/
class MovieDetails extends React.Component {
  /**
 * Contructor function for the MovieDetails class - set the initial state for the class
 * by checking for data in localStorage
 * @param   {object} props    properties passed into the class from the parent class
 * @constructor
 */
  constructor (props) {
    super(props);
    this.state = getItemFromLocalStorage('movie-' + props.match.params.id);
  }
  /**
   * componentDidMount function
   * Checks if initial state is empty - if true it queries the movie database
   */
  componentDidMount() {
    if (!Object.keys(this.state).length) {
      fetchData(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=${apiKey}`)
      .then(data => this.setState(data))
      .then(() => setItemInLocalStorage('movie-' + this.state.id, this.state));
    }
  }
  /**
 * render function - if the state is empty it returns "Loader" component,
 * otherwise it return the stateful represent state of the element
 * in the form of details of the movie retrieved from the database
 * including an image for the movie, title and overview
 * @return {ReactComponent}
 */
  render () {
    if(!Object.keys(this.state).length) return <Loader />;

    var {title, id, poster_path, overview} = this.state;
    return (
      <section>
        <h1>{title}</h1>
        <img alt={`Poster for ${title} movie`} src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
        <p>Overview: {overview}</p>
      </section>
    )
  }
}

export default MovieDetails;
