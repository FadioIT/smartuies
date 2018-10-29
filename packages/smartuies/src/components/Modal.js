import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { childrenPropType, renderChildren, aria } from '../utils';
import { KEY_CODES } from '../constants';

class Modal extends React.Component {
  static propTypes = {
    children: childrenPropType,
    renderModal: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    isOpen: PropTypes.bool,
    rootNode: PropTypes.object,
  };

  containerNode;

  componentDidMount() {
    this.containerNode = document.createElement('div');

    if (this.props.isOpen) {
      this.forceUpdate();
    }
  }

  componentDidUpdate() {
    const { isOpen, rootNode } = this.props;
    const { containerNode } = this;

    if (isOpen) {
      openModal(rootNode, containerNode);
    } else {
      closeModal(rootNode, containerNode);
    }
  }

  componentWillUnmount() {
    const { isOpen, rootNode } = this.props;
    const { containerNode } = this;

    if (isOpen) {
      closeModal(rootNode, containerNode);
    }
  }

  onKeyDown = e => {
    if (e.keyCode === KEY_CODES.ESCAPE && this.props.onClose) {
      this.props.onClose();
      e.preventDefault();
    }

    if (this.props.onKeyDown) {
      this.onKeyDown(e);
    }
  };

  onClick = e => {
    if (e.currentTarget === e.target && this.props.onClose) {
      this.props.onClose();
    }

    if (this.props.onClick) {
      this.onClick(e);
    }
  };

  render() {
    const { children, renderModal, isOpen, ...otherProps } = this.props;
    const { containerNode } = this;

    if (!isOpen || !containerNode) {
      return null;
    }

    return ReactDOM.createPortal(
      renderModal({
        onKeyDown: this.onKeyDown,
        onClick: this.onClick,
        ...otherProps,
        children: renderChildren(children, otherProps),
      }),
      containerNode,
    );
  }
}

export default Modal;

const openModal = (rootNode, containerNode) => {
  document.body.appendChild(containerNode);

  if (rootNode) {
    aria.hideNode(rootNode, containerNode);
  }
};

const closeModal = (rootNode, containerNode) => {
  document.body.removeChild(containerNode);

  if (rootNode) {
    aria.showNode(rootNode, containerNode);
  }
};
