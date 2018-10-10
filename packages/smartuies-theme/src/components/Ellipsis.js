import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css, classNamePropType } from '../utils/styleUtils';

const Ellipsis = React.forwardRef(
  ({ children, className, size = 16, ...otherProps }, ref) => (
    <span
      ref={ref}
      className={css(styles.ellipsis, className)}
      style={{
        paddingRight: size,
        mask: `linear-gradient(to left, transparent, #000 ${size}px)`,
        maskImage: `linear-gradient(to left, transparent, #000 ${size}px)`,
        WebkitMaskImage: `linear-gradient(to left, transparent, #000 ${size}px)`,
      }}
      {...otherProps}
    >
      {children}
    </span>
  ),
);

Ellipsis.propTypes = {
  children: PropTypes.any,
  className: classNamePropType,
  width: PropTypes.number,
};

export default Ellipsis;

const styles = StyleSheet.create({
  ellipsis: {
    display: 'flex',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
});
