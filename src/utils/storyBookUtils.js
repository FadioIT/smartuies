import React from 'react';

export const Button = React.forwardRef((props, ref) => (
  <button
    ref={ref}
    style={{
      background: '#29ABE2',
      border: 'none',
      borderRadius: 3,
      color: '#FFF',
      fontSize: '14px',
      padding: '8px 16px',
    }}
    type="button"
    {...props}
  />
));

export const Input = React.forwardRef((props, ref) => (
  <input
    ref={ref}
    style={{
      background: '#F7F7F7',
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: 3,
      boxShadow: 'inset 0 1px 2px rgba(0,0,0,.15)',
      color: '#444',
      fontSize: '14px',
      padding: '8px 16px',
    }}
    {...props}
  />
));

export const Window = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      background: '#FFF',
      border: '1px solid rgba(0,0,0,.15)',
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0,0,0,.15)',
      height: '100%',
      padding: 16,
      boxSizing: 'border-box',
    }}
    {...props}
  />
));

export const PanelTitle = React.forwardRef(({ open, ...props }, ref) => (
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
    {...props}
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
