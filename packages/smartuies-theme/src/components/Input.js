import React from 'react';

const Input = React.forwardRef((props, ref) => (
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

export default Input;
