import React from 'react';

const Button = React.forwardRef((props, ref) => (
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

export default Button;
