import React from 'react';
import PropTypes from 'prop-types';
import { DropDownButton, themeComponent } from '@fadioit/smartuies';
import Input from './Input';

const renderButton = ({ buttonRef, onToggle, open, ...props }) => (
  <Input ref={buttonRef} onFocus={!open && onToggle} {...props} />
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
