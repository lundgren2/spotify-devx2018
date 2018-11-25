import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from '../logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Overview from './Overview';
import MyEmotion from './MyEmotion';

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
      <div style={style.app}>
        <Router>
          <>
            <div style={style.container}>
              <Route exact path="/" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/overview" component={Overview} />
            </div>
            <Route
              exact
              path="/emotion"
              component={() => <MyEmotion emoji="🔥" color="orange" />}
            />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
