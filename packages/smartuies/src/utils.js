import PropTypes from 'prop-types';

export const renderChildren = (children, props) =>
  typeof children === 'function' ? children(props) : children;

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.func,
]);

export const refPropType = PropTypes.shape({
  current: PropTypes.object,
});

