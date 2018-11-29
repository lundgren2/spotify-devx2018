import React, { Component } from 'react';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';
import logo from '../logo.svg';

class Login extends Component {
  onClick = () => {
    const LOGIN_URL = window.location.href.includes('localhost')
      ? 'http://localhost:8888/login'
      : 'https://socify-server.herokuapp.com/login';

    window.location.href = LOGIN_URL;
  };

  render() {
    return (
      <Container bg={'#fff'} color={'#222'}>
        <Box p={20}>
          <Box>
            <img
              src={logo}
              alt="socify"
              width="250"
              style={{ filter: 'grayscale(1)' }}
            />
            <h1>Socify</h1>
          </Box>
          <p style={{ color: styles.colors.gray }}>
            Find friends based on your current mood.
          </p>
          <Button
            variant="success"
            backgroundColor={'#1ed760'}
            onClick={this.onClick}
          >
            Login with Spotify
          </Button>
        </Box>
      </Container>
    );
  }
}
export default Login;
