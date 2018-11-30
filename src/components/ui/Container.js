import React from 'react';
import styled from 'react-emotion';
import { Box } from '@smooth-ui/core-em';

const StyledBox = styled(Box)({
  '@media(max-width: 700px)': {
    margin: '10px !important',
    padding: '15px !important',
    background: 'red',
  },
});
const Container = props => {
  return (
    <StyledBox
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
      maxWidth="420px"
      maxHeight="640px"
      height="auto"
      width="100%"
      zIndex="2"
      {...props}
    >
      <div>{props.children}</div>
    </StyledBox>
  );
};

export default Container;
