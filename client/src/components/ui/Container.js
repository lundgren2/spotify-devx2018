import React from 'react';
import styled from 'react-emotion';
import { Box } from '@smooth-ui/core-em';

const Container = props => {
  return (
    <Box
      px={20}
      py={40}
      mt={'35%'}
      m={20}
      display="flex"
      flexDirection="column"
      backgroundColor="#fff"
      borderRadius={8}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, .06)"
      position="relative"
      height="80%"
    >
      <div>{props.children}</div>
    </Box>
  );
};

export default Container;
