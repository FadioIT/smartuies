import React from 'react';
import PropTypes from 'prop-types';

class CollapsiblePanel extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    renderButton: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
  };

  state = { open: true };

  onToggle = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.props.onToggle) {
          this.props.onToggle(this.state.open);
        }
      },
    );
  };

  render() {
    const { children, renderButton } = this.props;
    const { open } = this.state;
    return (
      <>
        {renderButton({ onToggle: this.onToggle, open })}
        {open && children()}
      </>
    );
  }
}

export default CollapsiblePanel;
