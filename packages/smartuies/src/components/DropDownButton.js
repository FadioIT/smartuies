import React from 'react';
import PropTypes from 'prop-types';
import PopUpAnchor from './PopUpAnchor';
import { refPropType, renderChildren, childrenPropType } from '../utils';

const KEY_CODES = {
  ESCAPE: 27,
};

class DropDownButton extends React.Component {
  static propTypes = {
    children: childrenPropType.isRequired,
    renderButton: PropTypes.func.isRequired,
    dropDownRef: refPropType,
    onToggle: PropTypes.func,
    onKeyDown: PropTypes.func,
    focusDropDown: PropTypes.bool,
    closable: PropTypes.bool,
  };

  static defaultProps = {
    focusDropDown: false,
    closable: true,
  };

  state = { open: false };

  dropDownRef = this.props.dropDownRef || React.createRef();

  buttonRef = React.createRef();

  onToggle = () => {
    this.setState(
      ({ open }) => ({ open: !open }),
      () => {
        if (this.state.open) {
          this.addWindowEventHandlers();
          if (this.props.focusDropDown) {
            this.dropDownRef.current.focus();
          }
        } else {
          this.removeWindowEventHandlers();
        }
        if (this.props.onToggle) {
          this.props.onToggle(this.state.open);
        }
      },
    );
  };

  onKeyDown = e => {
    const { closable, onKeyDown } = this.props;
    const { open } = this.state;

    switch (e.keyCode) {
      case KEY_CODES.ESCAPE:
        if (open && closable) {
          e.stopPropagation();
          this.onToggle();
        }
        break;
      default:
        break;
    }

    if (onKeyDown) {
      this.props.onKeyDown(e);
    }
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
    const {
      children,
      renderButton,
      renderDropDown,
      focusDropDown,
      closable,
      ...props
    } = this.props;
    const { open } = this.state;

    return (
      <PopUpAnchor
        {...props}
        displayPopUp={open}
        anchor={renderButton({
          ...props,
          buttonRef: this.buttonRef,
          onToggle: this.onToggle,
          onKeyDown: this.onKeyDown,
          open,
        })}
      >
        {renderChildren(children, {
          dropDownRef: this.dropDownRef,
          onToggle: this.onToggle,
          onKeyDown: this.onKeyDown,
          open,
        })}
      </PopUpAnchor>
    );
  }
}

export default DropDownButton;
