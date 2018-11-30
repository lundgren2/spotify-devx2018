import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from './Emoji';
import Container from './ui/Container';

export default () => {
  return (
    <Container>
      <h1>
        404 <Emoji symbol="🙈" />
      </h1>
      <p>We couldn't find this page, try to start over!</p>
      <Link to="/">Go home</Link>
    </Container>
  );
};
