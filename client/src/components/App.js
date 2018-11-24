import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from '../logo.svg';
import './App.css';
// import Dashboard from './Dashboard';
import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Route exact path="/" component={Login} />
            <Route exact path="/callback" component={Login} />
          </header>
        </div>
      </Router>
    );
  }
}

export default App;
