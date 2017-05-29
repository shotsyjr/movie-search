import React from 'react';
/**
* SearchForm Class - a form with an text input, a select box and a submit button
* @class
*/
class SearchForm extends React.Component {
  /**
  * render - return the search form
  * @return {ReactComponent}  - return the search form with refs and an onSubmit
  * function passed in from the parent component
  */
  render () {
    return (<form name="search-form" onSubmit={this.props.submit}>
      <fieldset className="form-group">
        <label htmlFor="query">
          Enter your search query:
        </label>
        <input type="text"
            name="query"
            ref={this.props.inputRef}
            className="form-control" />
      </fieldset>
      <input type="submit" value="Submit" name="submit-button" className="btn btn-primary" />
    </form>)
  }
};

export default SearchForm;
