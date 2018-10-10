import React from 'react';
import PropTypes from 'prop-types';
import { renderChildren, childrenPropType } from '../utils';

class CollapsiblePanel extends React.Component {
  static propTypes = {
    children: childrenPropType.isRequired,
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
        {open && renderChildren(children)}
      </>
    );
  }
}

export default CollapsiblePanel;
