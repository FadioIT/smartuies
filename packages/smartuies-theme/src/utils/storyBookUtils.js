/* eslint-disable import/prefer-default-export */
import React from 'react';

export const Window = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      background: '#FFF',
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0,0,0,.15)',
      height: '100%',
      boxSizing: 'border-box',
    }}
    {...props}
  />
));
