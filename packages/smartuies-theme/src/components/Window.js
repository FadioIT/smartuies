import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from '../utils/styleUtils';
import { colors, fontSizes } from '../theme';

const Window = React.forwardRef(({ head, children, foot }, ref) => (
  <div ref={ref} className={styles.container}>
    <div className={styles.window}>
      {head && <header className={styles.head}>{head}</header>}
      {children && <div className={styles.body}>{children}</div>}
      {foot && <div className={styles.foot}>{foot}</div>}
    </div>
  </div>
));

Window.propTypes = {
  head: PropTypes.node,
  children: PropTypes.node,
  foot: PropTypes.node,
};

export default Window;

const styles = StyleSheet.create({
  container: {
    maxWidth: '100%',
  },
  window: {
    background: '#FFF',
    borderRadius: 4,
    boxShadow: '0 8px 32px rgba(0,0,0, .15)',
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 0',
    width: '100%',
    maxWidth: 600,
  },
  head: {
    display: 'flex',
    flexDirection: 'row',
    margin: '12px 24px',
    fontSize: fontSizes.big,
    color: colors.textDarker,
  },
  body: {
    color: colors.textLighter,
    margin: '12px 24px',
  },
  foot: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: '24px 24px 0',
  },
});
