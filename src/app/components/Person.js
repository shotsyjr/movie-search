import React from 'react';

/**
* Person component - renders a list item for a person 
* @param   {string} name    name of the person
*
* @return {ReactComponent}  renders a link to a details page for the person
*/
const Person = ({ name }) => (
  <li className="person-list__item">
      {name}
  </li>
);

export default Person;
