import React from 'react';
import styled from 'react-emotion';
import Button from './ui/Button';
import { Box } from '@smooth-ui/core-em';
import Container from './ui/Container';
import styles from '../styles';

const Login = () => {
  return (
    <Container>
      <Box p={20} backgroundColor="white">
        <Box pt={20} mb={80}>
          <h1>Socify</h1>
        </Box>
        <p style={{ color: styles.colors.gray }}>
          Find friends based on your current mood.
        </p>
        <Button variant="primary">Login with Spotify</Button>
      </Box>
    </Container>
  );
};

export default Login;
