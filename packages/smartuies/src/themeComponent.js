import React from 'react';

export const isThemeComponent = Component =>
  typeof Component === 'function' &&
  (typeof Component.themedComponent === 'function' ||
    typeof Component.themedComponent === 'string');

export const themeComponent = (Component, theme) => {
  if (isThemeComponent(Component)) {
    return themeComponent(Component.themedComponent, {
      ...Component.defaultProps,
      ...theme,
    });
  }

  const Theme = props => <Component {...props} />;
  Theme.themedComponent = Component;
  Theme.defaultProps = {
    ...(Component.defaultProps || {}),
    ...theme,
  };

  return Theme;
};

export default themeComponent;
