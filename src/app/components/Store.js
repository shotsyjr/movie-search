/**
* Store - handles the calls to the localStorage and fetch requests for the application
*/

/**
* getItemFromLocalStorage - get an item from localStorage
* @param   {string} itemString   itemString to be used as a reference for retrieving data from localStorage
* @return {JSON}  - return the item from localStorage or an empty object
*/
export function getItemFromLocalStorage (itemString) {
  var item = localStorage.getItem(itemString);
  return JSON.parse(item) || {};
}

/**
* setItemInLocalStorage - store an item in localStorage
* @param   {string} itemString   itemString to be used as a reference for storing item in localStorage
* @param   {object} item         the item to be stored in localStorage
*/
export function setItemInLocalStorage (itemString, item) {
  localStorage.setItem(itemString, JSON.stringify(item));
}
/**
* fetchData - fetch data from a url
* @param   {string} url   url to use for GET request
* @return  {Promise}      returns Promise object
*/
export function fetchData(url) {
  return fetch(url)
    .then(data => data.json())
    // TODO: handle Promise reject properly
    .catch(error => {});
}
