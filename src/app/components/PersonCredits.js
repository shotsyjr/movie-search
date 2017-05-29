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
  * PersonCredits class for displaying the movie credits for the selected person
  * @class
*/
class PersonCredits extends React.Component {
  /**
   * Contructor function for the PersonDetails class - set the initial state for the class
   * by checking for data in localStorage
   * @param   {object} props    properties passed into the class from the parent class
   * @constructor
   */
  constructor (props) {
    super(props);
    this.state = getItemFromLocalStorage('person-' + props.match.params.id + '/credits');
  }
  /**
   * componentDidMount function
   * Checks if initial state is empty - if true it queries the movie database
   */
  componentDidMount() {
    if (!Object.keys(this.state).length) {
      fetchData(`https://api.themoviedb.org/3/person/${this.props.match.params.id}/credits?api_key=${apiKey}`)
      .then(data=>this.setState(data))
      .then(() => setItemInLocalStorage('person-' + this.state.id + '/credits', this.state));
    }
  }
  /**
   * render function - if the state is empty it returns "Loader" component,
   * otherwise it return the stateful represent state of the element
   * in the form of list of movie credits for this person showing cast and crew
   * credits (if available) and links to the detail pages for the movies
   * @return {ReactComponent}
   */
  render () {
    if(!Object.keys(this.state).length) return <Loader />;

    var {cast, crew} = this.state;
    return (
      <section>
        <h1>Movie credits</h1>
        {!!cast.length ?<h2>Cast</h2> : null }
        <ul className="cast-list">
        {cast.map(({character, title, id}) =>
            <li key={`${id}-${title}-${character}`}>
              {character} :
              <Link to={`/movie/details/${id}`}>
                {title}
              </Link>
            </li>
        )}
        </ul>
        {!!crew.length ? <h2>Crew</h2> : null }
        <ul className="crew-list">
        {crew.map(({job, title, id}) =>
            <li key={`${id}-${title}-${job}`}>
              <Link to={`/movie/details/${id}`}>
                {title}
              </Link>
              : {job}
            </li>
        )}
        </ul>
      </section>
    )
  }
}

export default PersonCredits;
