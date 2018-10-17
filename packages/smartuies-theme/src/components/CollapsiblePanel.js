import React from 'react';
import PropTypes from 'prop-types';
import { CollapsiblePanel, themeComponent } from '@fadioit/smartuies';
import ChevronUpIcon from './icons/ChevronUp';
import { StyleSheet, css } from '../utils/styleUtils';
import { boxShadows } from '../theme';

const SPACE_KEY_CODE = 32;

const renderButton = ({ onToggle, open, className, ...otherProps }) => (
  <div
    role="button"
    tabIndex={0}
    onClick={onToggle}
    onKeyUp={e => {
      if (e.keyCode === SPACE_KEY_CODE) {
        onToggle(e);
      }
    }}
    className={css(styles.title, className)}
    {...otherProps}
  >
    <div className={css(styles.label)}>Panel title</div>
    <ChevronUpIcon
      className={css(styles.chevron, open && styles.openChevron)}
    />
  </div>
);
renderButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  className: PropTypes.any,
};

const renderPanel = ({ children }) => (
  <div className={styles.panel}>{children}</div>
);
renderPanel.propTypes = {
  children: PropTypes.any,
};

export const theme = { renderButton, renderPanel };

export default themeComponent(CollapsiblePanel, theme);

const styles = StyleSheet.create({
  title: {
    border: '1px solid transparent',
    borderRadius: 2,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 16px',
    '&:focus:not(:focus-visible)': {
      outline: 'none',
    },
    '&:focus-visible': {
      outline: 'none',
      boxShadow: boxShadows.focus,
    },
  },
  label: {
    alignSelf: 'center',
  },
  chevron: {
    flexShrink: 0,
    transform: 'rotate(-180deg)',
    transition: 'transform .2s',
  },
  openChevron: {
    transform: 'rotate(0)',
  },

  panel: {
    padding: '8px 16px',
  },
});
