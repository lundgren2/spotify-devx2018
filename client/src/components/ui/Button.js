import React from 'react';
import styled from 'react-emotion';
import { Button as SmoothButton } from '@smooth-ui/core-em';
import styles from '../../styles';

const StyledButton = styled(SmoothButton)({
  height: 68,
  borderRadius: 8,
  border: 0,
  fontWeight: 'bold',
  fontSize: 24,
  background: styles.colors.brandColor,
  color: styles.colors.someBlue,
  width: '100%',
  boxShadow: styles.boxShadow,
});

const Button = props => {
  return (
    <StyledButton variant="success" {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledStatusButton = styled(SmoothButton)({
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
    <StyledStatusButton variant="secondary" {...props}>
      {props.children}
    </StyledStatusButton>
  );
};

export default Button;
