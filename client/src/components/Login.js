import React, { Component } from 'react';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';
import config from '../config';
import logo from '../logo.svg';

const URL = `${config.BASE}/?client_id=${config.CLIENT_ID}&response_type=${
  config.RESPONSIVE_TYPE
}&redirect_uri=${config.REDIRECT_URI}`;

class Login extends Component {
  render() {
    return (
      <Container bg={'#fff'} color={'#222'}>
        <Box p={20}>
          <Box pt={20} mb={80}>
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
          <a href={URL}>
            <Button variant="success" backgroundColor={'#1ed760'}>
              Login with Spotify
            </Button>
          </a>
        </Box>
      </Container>
    );
  }
}
export default Login;
