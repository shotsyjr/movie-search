import React from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import {getItemFromLocalStorage, setItemInLocalStorage, fetchData} from './Store';

/**
  * apiKey used for fetching data from the movie database
  * @type {string}
*/
const apiKey = "67b83f40bf6d1ea049594f29548af7dc";
/**
  * MovieCredits class displaying the movie credits for the selected movie
  * @class
*/
class MovieCredits extends React.Component {
  /**
 * Contructor function for the MovieCredits class - set the initial state for the class
 * by checking for data in localStorage
 * @param   {object} props    properties passed into the class from the parent class
 * @constructor
 */
  constructor (props) {
    super(props);
    this.state = getItemFromLocalStorage('movie-' + props.match.params.id + '/credits');
  }

  /**
   * componentDidMount function
   * Checks if initial state is empty - if true it queries the movie database
   */
  componentDidMount() {
    if (!Object.keys(this.state).length) {
      fetchData(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=${apiKey}`)
      .then(data=>this.setState(data))
      .then(() => setItemInLocalStorage('movie-' + this.state.id + '/credits', this.state));
    }
  }

  /**
 * render function - if the state is empty it returns "Loader" component,
 * otherwise it return the stateful represent state of the element
 * in the form of list of movie credits for this movie showing cast and crew
 * and links to the detail pages for the people
 * @return {ReactComponent}
 */
  render () {
    if(!Object.keys(this.state).length) return <Loader />;

    var {cast, crew} = this.state;
    return (
      <section>
        <h1>Movie credits</h1>
        <h2>Cast</h2>
        <ul className="cast-list">
        {cast.map(({character, name, id}) =>
            <li key={`${id}-${name}-${character}`}>
              {character} :
              <Link to={`/person/details/${id}`}>
                {name}
              </Link>

            </li>
        )}
        </ul>
        <h2>Crew Members</h2>
        <ul className="crew-list">
        {crew.map(({job, name, id}) =>
            <li key={`${id}-${name}-${job}`}>
              {name} : {job}
            </li>
        )}
        </ul>
      </section>
    )
  }
}

export default MovieCredits;
