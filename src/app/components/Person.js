import React from 'react';
import { Link } from 'react-router-dom';

/**
* Person component - renders a list item for a person with a link
* @param   {string} name    name of the person
* @param   {string} id      id from the movie database for the person
*
* @return {ReactComponent}  renders a link to a details page for the person
*/
const Person = ({ name, id }) => (
  <li className="person-list__item">
    <Link className="person-list__item__link"
          to={`/person/details/${id}`}>
      {name}
      </Link>
  </li>
);

export default Person;
