import { css } from 'react-emotion';

export const StyleSheet = {
  create: obj =>
    Object.entries(obj).reduce((result, [key, value]) => {
      result[key] = css(value);
      return result;
    }, {}),
};

export { css };
