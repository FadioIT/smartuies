import React from 'react';
import PropTypes from 'prop-types';

class ClickOut extends React.Component {
  static propTypes = {
    renderContainer: PropTypes.func.isRequired,
    onClickOut: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  container = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.handle, true);
    document.addEventListener('touchstart', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handle, true);
    document.removeEventListener('touchstart', this.handle, true);
  }

  handle = e => {
    if (
      this.container &&
      this.container.current &&
      this.container.current.contains &&
      !this.container.current.contains(e.target)
    ) {
      const { onClickOut } = this.props;
      onClickOut(e);
    }
  };

  render() {
    const { renderContainer, children } = this.props;
    return renderContainer({ container: this.container, children });
  }
}

export default ClickOut;
