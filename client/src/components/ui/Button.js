import React from 'react';
import styled from 'react-emotion';
import { Button as SmoothButton } from '@smooth-ui/core-em';
import { white, black } from 'ansi-colors';
import styles from '../../styles';

console.log(styles);

const StyledButton = styled(SmoothButton)({
  height: 84,
  borderRadius: 8,
  border: 0,
  fontWeight: 'bold',
  fontSize: 24,
  background: styles.colors.yellow,
  color: styles.colors.fontColor,
  padding: '0 30px',
  width: '80%',
  maxWidth: '440px',
  boxShadow: styles.boxShadow,
});

const Button = props => {
  return <StyledButton variant="warning">{props.children}</StyledButton>;
};

export default Button;
