import React from 'react';
import styled from 'react-emotion';
import { Button as SmoothButton } from '@smooth-ui/core-em';
import styles from '../../styles';

const StyledButton = styled(SmoothButton)({
  height: 72,
  borderRadius: 8,
  border: 0,
  fontWeight: 'bold',
  fontSize: 24,
  background: styles.colors.brandColor,
  color: styles.colors.someBlue,
  padding: '0 30px',
  width: '100%',
  // maxWidth: '440px',
  boxShadow: styles.boxShadow,
});

const Button = props => {
  return <StyledButton variant="success">{props.children}</StyledButton>;
};

const StyledStatusButton = styled(SmoothButton)({
  // height: 24,
  borderRadius: 8,
  border: 0,
  fontWeight: 'bold',
  fontSize: 15,
  color: '#fff',
  padding: '12px 14px',
  marginBottom: '14px',
  width: '100%',
  ':focus': {
    background: '#222',
  },
  boxShadow: styles.boxShadow,
});

export const StatusButton = props => {
  return (
    <StyledStatusButton variant="secondary">
      {props.children}
    </StyledStatusButton>
  );
};

export default Button;
