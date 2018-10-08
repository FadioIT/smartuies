import PropTypes from 'prop-types';
import { css } from 'react-emotion';

export const StyleSheet = {
  create: obj =>
    Object.entries(obj).reduce((result, [key, value]) => {
      result[key] = css(value);
      return result;
    }, {}),
};

export const classNamePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.object,
  PropTypes.array,
]);

export { css };
