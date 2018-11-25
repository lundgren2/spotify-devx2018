import React from 'react';
import styled from 'react-emotion';
import { Box } from '@smooth-ui/core-em';

const Container = props => {
  return (
    <Box
      px={20}
      py={20}
      mt={'35%'}
      m={20}
      display="flex"
      flexDirection="column"
      backgroundColor={props.bg ? props.bg : '#fff'}
      color={props.color && props.color}
      borderRadius={8}
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, .06)"
      position="relative"
      height="80%"
      minWidth="340px"
    >
      <div>{props.children}</div>
    </Box>
  );
};

export default Container;
