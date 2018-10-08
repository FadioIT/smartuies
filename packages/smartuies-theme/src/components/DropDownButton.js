import React from 'react';
import PropTypes from 'prop-types';
import { DropDownButton, themeComponent } from '@fadioit/smartuies';
import Button from './Button';

const renderButton = ({ buttonRef, onToggle, open, buttonLabel }) => (
  <Button ref={buttonRef} onClick={onToggle}>
    {open ? '▾' : '▸'} {buttonLabel}
  </Button>
);
renderButton.propTypes = {
  buttonRef: PropTypes.any,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  buttonLabel: PropTypes.node.isRequired,
};

export const theme = {
  renderButton,
};

export default themeComponent(DropDownButton, theme);
