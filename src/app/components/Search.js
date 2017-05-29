import React from 'react';
import SearchForm from './SearchForm';
import Results from './Results';
import Loader from './Loader';
import {getItemFromLocalStorage, setItemInLocalStorage, fetchData} from './Store';

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
    this.state = getItemFromLocalStorage('movies');
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
 * @param   {boolean} userSearch    boolean stating whether this search was initiated by a user using the search form
 * @param   {string} resultsType    the type of results we are expect - for state purpose
 */
  queryMovieDB (url, userSearch, resultsType) {
    fetchData(url)
    .then(({results}) => this.setState({results, userSearch, resultsType, searchFailed: this.searchFailed}))
    .then(() => setItemInLocalStorage('movies', this.state));
  }
  /**
 * onSubmit function handles the submit event from the search form.
 * The url is form from the form values and queryMovieDB is then called.
 * @param   {event} e    the event fired when the search form is submitted
 */
  onSubmit = (e) => {
    if(e) e.preventDefault();
    let inputQuery = this.inputElement.value;

    if (!!inputQuery) {
      this.searchFailed = false;
      let selectValue = this.selectElement.value;
      this.queryMovieDB(queryURL + selectValue + "?api_key=" +apiKey + "&query=" + inputQuery.split(' ').join('+'), true, selectValue )
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
    if(!Object.keys(this.state).length) return <Loader />;

    return (<section>
      <h1>The Movie Database Search</h1>
      {/* The Search form */}
      <SearchForm submit={this.onSubmit}
        inputRef={el => this.inputElement = el}
        selectRef={el => this.selectElement = el}
      />
      {/* Search form validation */}
      {this.state.searchFailed ? <p className="alert alert-warning" role="alert">Please enter text to search</p> : null }

      {/* The Search results will be displayed here */}
      <Results  {...this.state}/>
    </section>)
  }
}

export default Search;
