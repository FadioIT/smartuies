import React from 'react';
import PropTypes from 'prop-types';
import { Modal, themeComponent } from '@fadioit/smartuies';
import { StyleSheet } from '../utils/styleUtils';

const renderModal = ({ onKeyDown, onClose, children }) => (
  <div
    className={styles.overlay}
    onKeyDown={onKeyDown}
    onClick={onClose}
    role="tree"
    tabIndex={0}
  >
    <div className={styles.container}>
      <div className={styles.foo}>{children}</div>
    </div>
  </div>
);

renderModal.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.func,
  onKeyDown: PropTypes.func.isRequired,
};

export const theme = { renderModal };

export default themeComponent(Modal, theme);

const styles = StyleSheet.create({
  overlay: {
    background: 'rgba(0,0,0, .75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    filter: 'drop-shadow(0 8px 32px rgba(0,0,0, .75))',
  },
});
