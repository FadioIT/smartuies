import React from 'react';
import { StyleSheet, css } from '../utils/styleUtils';
import { colors, fonts, fontSizes } from '../theme';

const Input = React.forwardRef(
  ({ className, disabled, ...otherProps }, ref) => (
    <input
      ref={ref}
      disabled={disabled}
      className={css(styles.input, disabled && styles.disabled, className)}
      {...otherProps}
    />
  ),
);

export default Input;

const styles = StyleSheet.create({
  input: {
    background: '#F2F2F2',
    border: 'none',
    borderRadius: 3,
    color: '#444',
    fontFamily: fonts.normal,
    fontSize: fontSizes.normal,
    minWidth: 0,
    padding: 8,
    transition: 'all .2s',
    '&:placeholder': {
      color: '#888',
    },
    '&:hover': {
      background: '#E9E9E9',
    },
    '&:focus': {
      outline: 'none',
      background: '#FFF',
      boxShadow: `0 0 0 1px ${colors.primaryLighter}, inset 0 0 0 1px ${
        colors.primaryLighter
      }`,
    },
  },
});
