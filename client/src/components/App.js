import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import './App.css';

import styles from '../styles';
import Dashboard from './Dashboard';
import Login from './Login';
import Overview from './Overview';
import MyEmotion from './MyEmotion';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       props.isAuthed ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />
// );

class App extends Component {
  state = {
    serverData: {},
    isAuthed: false,
  };

  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    if (parsed.access_token) {
      localStorage.setItem('accessToken', parsed.access_token);
      localStorage.setItem('refreshToken', parsed.refresh_token);
      this.setState({ isAuthed: true });
    }
  }

  render() {
    const { isAuthed } = this.state;

    return (
      <div style={styles.app}>
        <Router>
          <>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Dashboard} isAuthed={isAuthed} />
            <Route path="/overview" component={Overview} isAuthed={isAuthed} />
            <Route path="/emotion" component={MyEmotion} isAuthed={isAuthed} />
          </>
        </Router>
      </div>
    );
  }
}

export default App;
