import React from 'react';
import Loader from './Loader';
import {getItemFromLocalStorage, setItemInLocalStorage, fetchData} from './Store';

/**
  * apiKey used for fetching data from the movie database
  * @type {string}
*/
const apiKey = "67b83f40bf6d1ea049594f29548af7dc";
/**
  * PersonDetails class for displaying the details of a person from the database
  * @class
*/
class PersonDetails extends React.Component {
  /**
   * Contructor function for the PersonDetails class - set the initial state for the class
   * by checking for data in localStorage
   * @param   {object} props    properties passed into the class from the parent class
   * @constructor
   */
 constructor (props) {
    super(props);
    this.state = getItemFromLocalStorage('person-' + props.match.params.id);
  }
  /**
   * componentDidMount function
   * Checks if initial state is empty - if true it queries the movie database
   */
  componentDidMount() {
    if (!Object.keys(this.state).length) {
      fetchData(`https://api.themoviedb.org/3/person/${this.props.match.params.id}?api_key=${apiKey}`)
      .then(data => this.setState(data))
      .then(() => setItemInLocalStorage('person-' + this.state.id , this.state));
    }
  }
  /**
 * render function - if the state is empty it returns "Loader" component,
 * otherwise it return the stateful represent state of the element
 * in the form of details of the person retrieved from the database
 * including an image for the person, name, birthday, place of birth, deathday, gender, and biography (if they are available)
 * @return {ReactComponent}
 */
  render () {
    if(!Object.keys(this.state).length) return <Loader />;

    var {id, name, deathday, birthday, profile_path, place_of_birth, biography, gender} = this.state;
    return (
      <section>
        <h1>{name}</h1>
        {!!profile_path ? <img alt={`Image of ${name}`} src={`https://image.tmdb.org/t/p/w500/${profile_path}`} /> : null }
        {!!birthday ? <p>Date of birth: {birthday}</p> : null }
        {!!place_of_birth ? <p>Place of birth: {place_of_birth}</p> : null }
        {!!deathday ? <p>Died: {deathday}</p> : null }
        <p>Gender: {gender !== 1 ? "Male" : "Female"}</p>
        {!!biography ? <p>{biography}</p> : null }
      </section>
    )
  }
}

export default PersonDetails;
