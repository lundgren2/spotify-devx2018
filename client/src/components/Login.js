import React, { Component } from 'react';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';
import config from '../config';

// const scope = ''; // to be added
const URL = `${config.BASE}/?client_id=${config.CLIENT_ID}&response_type=${
  config.RESPONSIVE_TYPE
}&redirect_uri=${config.REDIRECT_URI}`;

class Login extends Component {
  render() {
    return (
      <Container>
        <Box p={20} backgroundColor="white">
          <Box pt={20} mb={80}>
            <h1>Socify</h1>
          </Box>
          <p style={{ color: styles.colors.gray }}>
            Find friends based on your current mood.
          </p>
          <a href={URL}>Login</a>
          <Button variant="primary">Login with Spotify</Button>
        </Box>
      </Container>
    );
  }
}
export default Login;
