import React from 'react';
import PropTypes from 'prop-types';
import { DropDownButton, themeComponent } from '@fadioit/smartuies';
import Input from './Input';

const renderButton = ({ buttonRef, onToggle, open }) => (
  <Input ref={buttonRef} onFocus={open ? undefined : onToggle} />
);
renderButton.propTypes = {
  buttonRef: PropTypes.any,
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export const theme = {
  renderButton,
};

export default themeComponent(DropDownButton, theme);
