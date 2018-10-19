import PropTypes from 'prop-types';
import * as aria from './ariaUtils';

export { aria };

export const renderChildren = (children, props) =>
  typeof children === 'function' ? children(props) : children;

export const childrenPropType = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.func,
]);

export const refPropType = PropTypes.shape({
  current: PropTypes.object,
});
