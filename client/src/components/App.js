import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import Dashboard from './Dashboard';

class App extends Component {
  render() {
    console.log(process.env.REACT_APP_TOKEN);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Dashboard />
        </header>
      </div>
    );
  }
}

export default App;
