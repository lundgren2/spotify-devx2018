import React, { Component } from 'react';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';
const base = process.env.REACT_APP_BASE;
const client_id = process.env.REACT_APP_CLIENT_ID;
const response_type = process.env.REACT_APP_RESPONSE_TYPE;
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
// const scope = ''; // to be added
const URL = `${base}/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`;

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
          <a href={URL}>
            <Button variant="primary">Login with Spotify</Button>
          </a>
        </Box>
      </Container>
    );
  }
}
export default Login;
