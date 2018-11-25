import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// import logo from '../logo.svg';
import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import Overview from './Overview';
import MyEmotion from './MyEmotion';
import styles from '../styles';

const style = {
  app: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
    backgroundImage: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
    justifyContent: 'center',
  },
  container: {
    maxWidth: '100%',
    width: '480px',
  },
};

class App extends Component {
  render() {
    return (
      <div style={style.app}>
        <Router>
          <>
            <div style={styles.container}>
              <Route exact path="/" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/overview" component={Overview} />
            </div>
            <Route path="/emotion" exact component={MyEmotion} />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
