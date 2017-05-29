import React from 'react';

/**
* Results component - renders the results fetched from the movie database
* @param   {array} results        array of results retrieved from the database / localStorage
* @return {ReactComponent}        list of the movies found
*/
const Results = ({ results }) => {

  // returns a note to the user when there are no results
  if (!results.length) {
    return (<h2>No movies found.</h2>);
  }

  return (<div>
    <h2>Lastest Search</h2>
    {/* The Search results will be displayed here */}
    <ul className="movie-list" >
      {results.map(result =>
        <li className="movie-list__item" key={result.id}>{result.id} - {result.title}</li>
      )}
    </ul>
  </div>);
};

export default Results;
