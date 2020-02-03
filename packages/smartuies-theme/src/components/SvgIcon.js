import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import { StyleSheet, classNamePropType } from '../utils/styleUtils';

const SVGIcon = ({
  className,
  viewSize = 24,
  viewWidth = viewSize,
  viewHeight = viewSize,
  size = 24,
  width = size || viewHeight,
  height = size || viewWidth,
  ...otherProps
}) => (
  <svg
    aria-hidden
    role="img"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${viewWidth} ${viewHeight}`}
    className={css(styles.icon, className)}
    {...otherProps}
  />
);

SVGIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  size: PropTypes.number,
  viewWidth: PropTypes.number,
  viewHeight: PropTypes.number,
  viewSize: PropTypes.number,
  className: classNamePropType,
};

export default SVGIcon;

const styles = StyleSheet.create({
  icon: {
    verticalAlign: 'middle',
    fill: 'currentColor',
  },
});
