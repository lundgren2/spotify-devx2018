import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import queryString from 'query-string';
import './App.css';
import styles from '../styles';
import Dashboard from './Dashboard';
import Login from './Login';
import Overview from './Overview';
import GitHubLogo from '../images/github';
import NoMatch from './NoMatch';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem('accessToken') != null ||
      window.location.search.includes('access_token') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  state = {
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
            <PrivateRoute
              exact
              path="/"
              component={Dashboard}
              isAuthed={isAuthed}
            />
            <PrivateRoute
              path="/overview"
              component={Overview}
              isAuthed={isAuthed}
            />
            <Route component={NoMatch} />
          </>
        </Router>
        <a
          className="github"
          href="https://github.com/lundgren2/spotify-devx2018"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogo width="200" />
        </a>
      </div>
    );
  }
}

export default App;
