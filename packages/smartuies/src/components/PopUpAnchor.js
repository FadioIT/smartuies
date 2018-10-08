import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const PopUpPosition = {
  LEFT: 'left',
  RIGHT: 'right',
  ABOVE: 'above',
  BELOW: 'below',
  TOP_LEFT: 'topLeft',
};

class PopUpAnchor extends React.Component {
  static propTypes = {
    popUpHeightMatchesAnchorHeight: PropTypes.bool,
    popUpWidthMatchesAnchorWidth: PropTypes.bool,
    popUpPosition: PropTypes.oneOf([
      'left',
      'right',
      'above',
      'below',
      'topLeft',
    ]),

    anchor: PropTypes.element.isRequired,
    children: PropTypes.node,
    displayPopUp: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    popUpHeightMatchesAnchorHeight: false,
    popUpWidthMatchesAnchorWidth: false,
    popUpPosition: PopUpPosition.BELOW,
  };

  constructor(props, context) {
    super(props, context);
    this.popUpNode = document.createElement('div');
    document.body.appendChild(this.popUpNode);
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.windowResizeHandler);
    }
    this.updatePopUp();
  }

  componentWillUnmount() {
    document.body.removeChild(this.popUpNode);
    if (window) {
      window.removeEventListener('resize', this.windowResizeHandler);
    }
  }

  componentDidUpdate() {
    this.updatePopUp();
  }

  updatePopUp() {
    const {
      popUpHeightMatchesAnchorHeight,
      popUpWidthMatchesAnchorWidth,
      popUpPosition,
      displayPopUp,
    } = this.props;

    const { popUpNode } = this;
    popUpNode.style.display = 'none';
    // eslint-disable-next-line react/no-find-dom-node
    const domNode = ReactDOM.findDOMNode(this);
    const domNodeNodeBounds = domNode.getBoundingClientRect();

    popUpNode.style.display = displayPopUp ? null : 'none';

    const {
      width: popupNodeWidth,
      height: popupNodeHeight,
    } = popUpNode.firstChild.getBoundingClientRect();

    this.popUpNode.style.height = popUpHeightMatchesAnchorHeight
      ? `${domNodeNodeBounds.height}px`
      : null;

    this.popUpNode.style.width = popUpWidthMatchesAnchorWidth
      ? `${domNodeNodeBounds.width}px`
      : null;

    const nodeBounds = {
      left: domNodeNodeBounds.left,
      top: domNodeNodeBounds.top,
    };

    switch (popUpPosition) {
      case PopUpPosition.BELOW:
        nodeBounds.top += domNodeNodeBounds.height;
        break;
      case PopUpPosition.ABOVE:
        nodeBounds.top -= popupNodeHeight;
        break;
      case PopUpPosition.RIGHT:
        nodeBounds.left = domNodeNodeBounds.right;
        nodeBounds.top -= popupNodeHeight / 2 - domNodeNodeBounds.height / 2;
        break;
      case PopUpPosition.LEFT:
        nodeBounds.left -= popupNodeWidth;
        nodeBounds.top -= popupNodeHeight / 2 - domNodeNodeBounds.height / 2;
        break;
      case PopUpPosition.TOP_LEFT:
      default:
        // already 0,0
        break;
    }

    popUpNode.style.position = 'absolute';
    popUpNode.style.top = `${nodeBounds.top}px`;
    popUpNode.style.left = `${nodeBounds.left}px`;
  }

  render() {
    const { children, anchor } = this.props;

    const popup = ReactDOM.createPortal(children, this.popUpNode);

    return (
      <>
        {anchor}
        {popup}
      </>
    );
  }

  windowResizeHandler = () => {
    this.forceUpdate();
  };
}

PopUpAnchor.positions = PopUpPosition;

export default PopUpAnchor;
