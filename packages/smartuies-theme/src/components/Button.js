import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from '../utils/styleUtils';
import { colors, fonts, fontSizes, boxShadows } from '../theme';

const Button = React.forwardRef(
  (
    {
      disabled,
      kind,
      outline = true,
      light = false,
      round = false,
      full = false,
      className,
      children,
      ...otherProps
    },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      className={css(
        styles.button,
        kind && kinds[kind],
        kind && light && lightKinds[kind],
        full && styles.full,
        round && styles.round,
        disabled && styles.disabled,
        !outline && styles.noOutline,
        light && styles.light,
        className,
      )}
      {...otherProps}
    >
      <span>{children}</span>
    </button>
  ),
);

Button.propTypes = {
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  light: PropTypes.bool,
  round: PropTypes.bool,
  full: PropTypes.bool,
  kind: PropTypes.oneOf(['primary', 'secondary', 'risky', 'fatal']),
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  outline: true,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    background: '#FFF',
    border: `1px solid #D2D2D2`,
    borderRadius: 3,
    color: '#555',
    display: 'inline-flex',
    justifyContent: 'center',
    cursor: 'pointer',
    fontFamily: fonts.normal,
    fontSize: fontSizes.normal,
    minWidth: 0,
    padding: '8px 16px',
    textAlign: 'center',
    transition: 'all .2s',
    '&:hover': {
      background: '#FAFAFA',
      boxShadow: '0 2px 2px -1px rgba(0,0,0,.1)',
    },
    '&:active': {
      boxShadow: 'none',
    },
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: boxShadows.focus,
    },
  },

  // modifiers
  disabled: {
    '&, &:hover': {
      background: '#F7F7F7',
      borderColor: '#DDD',
      color: '#CCC',
      cursor: 'default',
      boxShadow: 'none',
    },
  },
  noOutline: {
    '&, &:hover, &:focus': {
      borderColor: 'transparent',
    },
  },
  light: {
    '&, &:focus, &:hover': {
      background: 'transparent',
    },
  },
  round: {
    padding: 8,
    borderRadius: '100%',

    '&:after': {
      content: "''",
      opacity: 0.5,
      height: 0,
      paddingTop: '100%',
      width: '100%',
      marginLeft: '-100%',
      zIndex: -1,
    },
  },
  full: {
    display: 'flex',
    width: '100%',
  },
});

const kinds = StyleSheet.create({
  primary: {
    background: colors.primary,
    borderColor: colors.primary,
    color: '#FFF',
    '&:hover': {
      background: colors.primaryDarker,
      borderColor: colors.primaryDarker,
    },
  },
  secondary: {
    background: colors.secondary,
    borderColor: colors.secondary,
    color: '#FFF',
    '&:hover': {
      background: colors.secondaryDarker,
      borderColor: colors.secondaryDarker,
    },
  },
  risky: {
    background: colors.risky,
    borderColor: colors.risky,
    color: '#FFF',
    '&:hover': {
      background: colors.riskyDarker,
      borderColor: colors.riskyDarker,
    },
  },
  fatal: {
    background: colors.fatal,
    borderColor: colors.fatal,
    color: '#FFF',
    '&:hover': {
      background: colors.fatalDarker,
      borderColor: colors.fatalDarker,
    },
  },
});

const lightKinds = StyleSheet.create({
  primary: {
    '&, &:hover, &:focus': {
      color: colors.primaryDarker,
    },
  },
  secondary: {
    '&, &:hover, &:focus': {
      color: colors.secondaryDarker,
    },
  },
  risky: {
    '&, &:hover, &:focus': {
      color: colors.riskyDarker,
    },
  },
  fatal: {
    '&, &:hover, &:focus': {
      color: colors.fatalDarker,
    },
  },
});
