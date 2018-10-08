import React from 'react';
import PropTypes from 'prop-types';
import PopUpAnchor from './PopUpAnchor';

class DropDownButton extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    renderButton: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
  };

  state = { open: false };

  dropDownRef = React.createRef();

  buttonRef = React.createRef();

  onToggle = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.state.open) {
          this.addWindowEventHandlers();
        } else {
          this.removeWindowEventHandlers();
        }
        if (this.props.onToggle) {
          this.props.onToggle(this.state.open);
        }
      },
    );
  };

  onWindowMouseDown = event => {
    const dropdown = this.dropDownRef.current;
    const button = this.buttonRef.current;
    if (dropdown) {
      let { target } = event;
      while (target) {
        if (target === dropdown || target === button) {
          return;
        }
        target = target.parentNode;
      }
    }
    this.onToggle();
  };

  addWindowEventHandlers = () => {
    window.addEventListener('resize', this.onToggle);
    window.addEventListener('mousedown', this.onWindowMouseDown);
  };

  removeWindowEventHandlers = () => {
    window.removeEventListener('resize', this.onToggle);
    window.removeEventListener('mousedown', this.onWindowMouseDown);
  };

  componentWillUnmount() {
    this.removeWindowEventHandlers();
  }

  render() {
    const { children, renderButton, ...props } = this.props;
    const { open } = this.state;
    return (
      <PopUpAnchor
        {...props}
        displayPopUp={open}
        anchor={renderButton({
          ...props,
          buttonRef: this.buttonRef,
          onToggle: this.onToggle,
          open,
        })}
      >
        {children({
          dropDownRef: this.dropDownRef,
          onToggle: this.onToggle,
          open,
        })}
      </PopUpAnchor>
    );
  }
}

export default DropDownButton;
