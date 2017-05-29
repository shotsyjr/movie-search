import React from 'react';

/**
* Loader component used as a placeholder when the date is being fetched
* @return {ReactComponent}  renders a Loader component with a spinning gif
*/
const Loader = () => (
  <div className="loader" aria-live='polite'>
    <img alt="Loading page" src="spinner.gif" />
  </div>
);

export default Loader;
