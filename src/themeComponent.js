import React from 'react';

const themeComponent = (Component, theme) => {
  const Theme = props => <Component {...theme} {...props} />;
  return Theme;
};

export default themeComponent;
