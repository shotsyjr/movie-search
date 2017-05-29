import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Link } from 'react-router-dom';
import Routes from './Routes';

/**
* App Component holds the application routes
* @return {ReactComponent}
*/
class App extends React.Component {
  render () {
    return <Routes />
  }
}
/**
* Rendering the application in a HashRouter - appending it to the app div
*/
render(<HashRouter>
  <main>
    <header>
      <Link className="home-link" to={`/`}>
        Home
      </Link>
    </header>
    <App />
  </main>
  </HashRouter>,
  document.getElementById('app'));
