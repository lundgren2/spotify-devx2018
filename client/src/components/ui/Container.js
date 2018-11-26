import React from 'react';
import { Box } from '@smooth-ui/core-em';

const Container = props => {
  return (
    <Box
      py={25}
      px={20}
      m={20}
      display="flex"
      flexDirection="column"
      backgroundColor={props.bg ? props.bg : '#fff'}
      color={props.color && props.color}
      borderRadius={8}
      position="relative"
      textAlign="center"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, .06)"
      minHeight="480px"
      maxWidth="420px"
      maxHeight="750px"
    >
      <div>{props.children}</div>
    </Box>
  );
};

export default Container;
