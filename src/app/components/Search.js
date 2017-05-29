import React from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import Loader from './Loader';

/**
  * apiKey used for fetching data from the movie database
  * @type {string}
*/
const apiKey = "67b83f40bf6d1ea049594f29548af7dc";
/**
  * movieURL used for initially fetching data from the movie database when no data available
  * @type {string}
*/
const movieURL = "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2017-02-15&primary_release_date.lte=2017-05-26&api_key=" + apiKey;
/**
  * queryURL used to form the url that fetches data from the movie database
  * this will be concatenated with 'person' or 'movie', as well as the apiKey
  * @type {string}
*/
const queryURL = "https://api.themoviedb.org/3/search/";

/**
  * Search Class used to query the movie database
  * @class
*/
class Search extends React.Component {
  /**
 * Contructor function for the Search class - set the initial state for the class
 * by checking for data in localStorage
 * @param   {object} props    properties passed into the class from the parent class
 * @constructor
 */
  constructor (props) {
    super(props);
    var item = localStorage.getItem("movies");
    this.state = JSON.parse(item) || {};
  }
  /**
 * componentDidMount function
 * Checks if initial state is empty - if true it queries the movie database
 */
  componentDidMount() {
    if (!Object.keys(this.state).length) {
      this.queryMovieDB(movieURL, false, "movie");
    }
  }
  /**
 * queryMovieDB function fetches data from the movie database and sets the new state, then saves the new state in localStorage
 * @param   {string} url    the url to fetch data from
 */
  queryMovieDB (url) {
    fetch(url)
      .then(data => data.json())
      .then(({results}) => this.setState({results, searchFailed: this.searchFailed}))
      .then(() => localStorage.setItem('movies', JSON.stringify(this.state)))
      .catch(error => console.log(error))
  }
  /**
 * onSubmit function handles the submit event from the search form.
 * The url is form from the form values and queryMovieDB is then called.
 * @param   {event} e    the event fired when the search form is submitted
 */
  onSubmit = (e) => {
    if(e) e.preventDefault();
    let inputQuery = this.inputElement.value;

    // if there's no input the search will fail
    if (!!inputQuery) {
      this.searchFailed = false;
      this.queryMovieDB(queryURL + "movie" + "?api_key=" +apiKey + "&query=" + inputQuery.split(' ').join('+') )
    } else {
      this.setState({searchFailed: true});
    }
  }
  /**
 * render function - if the state is empty it returns "Loading...",
 *  otherwise it return the stateful represent state of the element
 *  in the form of the search page with SearchForm and Results rendered
 * @return {ReactComponent}
 */
  render () {
    // return Loader if the state is empty
    if(!Object.keys(this.state).length) return <Loader />;

    return (<div>
      <h1>Movie DB search</h1>
      {/* The Search form */}
      <SearchForm submit={this.onSubmit}
        inputRef={el => this.inputElement = el}
      />
      {/* Search form validation */}
      {this.state.searchFailed ? <p className="alert alert-warning" role="alert">Please enter text to search</p> : null }

      {/* The Search results will be displayed here */}
      <Results  {...this.state}/>
    </div>)
  }
}

export default Search;
