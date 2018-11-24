import React, { Component } from 'react';
import logo from '../logo.svg';
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
    console.log(process.env.REACT_APP_TOKEN);
    return (
      <div style={style.app}>
        <div style={style.container}>
          <Header />
          <Login />
          <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
