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

export const PanelTitle = React.forwardRef(({ open, ...otherProps }, ref) => (
  <div
    ref={ref}
    style={{
      background: '#444',
      border: '1px solid transparent',
      borderRadius: open ? '2px 2px 0 0' : 2,
      color: '#FFF',
      cursor: 'pointer',
      padding: '8px 16px',
    }}
    {...otherProps}
  />
));

export const Panel = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      border: '1px solid rgba(0,0,0,.15)',
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2,
      padding: 16,
    }}
    {...props}
  />
));
