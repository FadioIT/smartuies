import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckBox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.func.isRequired,
    onChange: PropTypes.func,
  };

  inputRef = React.createRef();

  isControlled = () => this.props.checked !== undefined;

  isChecked = () =>
    this.isControlled()
      ? this.props.checked
      : !!(this.inputRef.current || {}).checked;

  onChange = e => {
    if (!this.isControlled()) {
      this.forceUpdate();
    }

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  render() {
    const { children, ...otherProps } = this.props;

    return children({
      ...otherProps,
      onChange: this.onChange,
      inputRef: this.inputRef,
      checked: this.isChecked(),
    });
  }
}

export default CheckBox;
