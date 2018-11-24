import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from '../logo.svg';
import './App.css';
import Header from './Header';
import Dashboard from './Dashboard';
import Login from './Login';

const style = {
  app: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    background: 'rgb(32, 0, 255)',
    textAlign: 'center',
  },
  container: {
    maxWidth: 840,
    margin: '0 auto',
  },
};

class App extends Component {
  render() {
    return (
      <Router>
        <div style={style.app}>
          <div style={style.container}>
            <Header />
            <Login />
            <Dashboard />
            <Route exact path="/" component={Login} />
            <Route exact path="/callback" component={Login} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
