import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './components/Search';
import MovieDetails from './components/MovieDetails';
import MovieCredits from './components/MovieCredits';
import PersonDetails from './components/PersonDetails';
import PersonCredits from './components/PersonCredits';

/**
* Routes holds the routes used in the app
* The initial route call the Search Component
* @return {ReactComponent}  Routes to be used in a HashRouter
*/
const Routes = () => (<Switch>
  <Route exact path='/' component={Search} />
  <Route path='/movie/details/:id' component={MovieDetails}/>
  <Route path='/movie/credits/:id' component={MovieCredits}/>
  <Route path='/person/details/:id' component={PersonDetails}/>
  <Route path='/person/credits/:id' component={PersonCredits}/>
</Switch>);

export default Routes;
