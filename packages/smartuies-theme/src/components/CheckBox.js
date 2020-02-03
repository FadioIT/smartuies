import React from 'react';
import PropTypes from 'prop-types';
import { CheckBox, themeComponent } from '@fadioit/smartuies';
import { StyleSheet, css } from '../utils/styleUtils';
import { colors, mixins } from '../theme';

import CheckBoxIcon from './icons/CheckBox';
import CheckedCheckBoxIcon from './icons/CheckedCheckBox';

const children = ({
  id,
  checked,
  disabled,
  onChange,
  inputRef,
  ...otherProps
}) => {
  const iconClassName = css(
    styles.icon,
    checked && styles.checkedIcon,
    disabled && styles.disabledIcon,
  );

  return (
    <label htmlFor={id} {...otherProps}>
      {checked ? (
        <CheckedCheckBoxIcon className={iconClassName} />
      ) : (
        <CheckBoxIcon className={iconClassName} />
      )}
      <input
        ref={inputRef}
        type="checkbox"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className={css(mixins.outsight)}
        id={id}
      />
    </label>
  );
};

children.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  inputRef: PropTypes.object,
};

export const theme = { children };

export default themeComponent(CheckBox, theme);

const styles = StyleSheet.create({
  icon: {
    color: '#555',
  },
  checkedIcon: {
    color: colors.primary,
  },
  disabledIcon: {
    color: '#CCC',
  },
});
