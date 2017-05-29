import React from 'react';

/**
* Results component - renders the results fetched from the movie database
* @param   {boolean} userSearch   boolean for whether the fetch was initiated by a user
* @param   {array} results        array of results retrieved from the database / localStorage
* @param   {string} resultsType   type of search performed "movie" or "person"
* @return {ReactComponent}        if the results are empty the component returns a <h2> to notify the
* user that no results were found. Otherwise the results are render as either a list of movies or people
*/
const Results = ({ userSearch, results, resultsType }) => {

  let classType = (resultsType === "movie") ? "movie-list" : "person-list";

  // returns a note to the user when there are no results
  if (!results.length) {
    return (<h2 className={classType}>No {resultsType === "movie" ? "movies" : "people"} found.</h2>);
  }

  return (<div>
    <h2 className="search-title">{userSearch ? "Lastest Search" : "Recent Movie Releases" }</h2>
    <ul className={classType} >
      {results.map(result =>
        <li key={result.id} className={`${classType}__item`}>
          {(resultsType === "movie") ? result.title : result.name}
        </li>
      )}
    </ul>
  </div>);
};

export default Results;
