import React from 'react';
import PropTypes from 'prop-types';
import { ClickOut, themeComponent } from '@fadioit/smartuies';
import { StyleSheet } from '../utils/styleUtils';

const renderContainer = ({ container, children }) => (
  <div ref={container} className={styles.container}>
    {children}
  </div>
);
renderContainer.propTypes = {
  container: PropTypes.any,
  children: PropTypes.any,
};

export const theme = { renderContainer };

const styles = StyleSheet.create({
  container: {
    border: '1px solid red',
  },
});

export default themeComponent(ClickOut, theme);
