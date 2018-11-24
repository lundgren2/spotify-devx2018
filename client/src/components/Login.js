import React, { Component } from 'react';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';

const base = 'https://accounts.spotify.com/authorize';
const client_id = '167d9bf647524ef28ea579584c33e6bb';
const response_type = 'code';
const redirect_uri = 'http://localhost:3000/dashboard';
// const scope = ''; // to be added
const URL = `${base}/?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}`;

class Login extends Component {
  
  componentDidMount() {
    const queryParams = this.props.location && this.props.location.search;
    const parsed = queryString.parse(queryParams);
    axios
      .get('http://localhost:8888/callback', {
        params: {
          code: parsed.code,
          redirect_uri: redirect_uri,
        },
      })
      .then(json => {
        // handle tokens
        console.log(json);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleClick = () => {
    console.log('click');
  };
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
