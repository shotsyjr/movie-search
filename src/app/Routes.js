import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import PersonDetails from './components/PersonDetails';

/**
* Routes holds the routes used in the app
* The initial route call the Search Component
* @return {ReactComponent}  Routes to be used in a HashRouter
*/
const Routes = () => (<Switch>
  <Route exact path='/' component={Search} />
  <Route path='/movie/details/:id' component={MovieDetails}/>
  <Route path='/person/details/:id' component={PersonDetails}/>
</Switch>);

export default Routes;
