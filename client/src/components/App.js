import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Overview from './Overview';
import MyEmotion from './MyEmotion';
import styles from '../styles';

class App extends Component {
  state = {
    token: null,
  };

  render() {
    return (
      <div style={styles.app}>
        <Router>
          <>
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/overview" component={Overview} />
            <Route path="/emotion" exact component={MyEmotion} />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
