import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Search from './components/Search';
/**
* Routes holds the routes used in the app
* The initial route call the Search Component
* @return {ReactComponent}  Routes to be used in a HashRouter
*/
const Routes = () => (<Switch>
  <Route exact path='/' component={Search} />
</Switch>);

export default Routes;
