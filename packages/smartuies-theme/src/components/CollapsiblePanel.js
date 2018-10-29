import React from 'react';
import PropTypes from 'prop-types';
import { CollapsiblePanel, themeComponent } from '@fadioit/smartuies';
import { Spring } from 'react-spring';
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

const renderPanel = ({ children, open }) => (
  <Spring to={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
    {transitionStyles => (
      <div className={styles.drawer} style={transitionStyles}>
        <div className={styles.panel}>{children}</div>
      </div>
    )}
  </Spring>
);
renderPanel.propTypes = {
  children: PropTypes.any,
  open: PropTypes.bool.isRequired,
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

  drawer: {
    overflow: 'hidden',
  },
  panel: {
    padding: '8px 16px',
  },
});
