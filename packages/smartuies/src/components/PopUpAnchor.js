import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const POSITIONS = {
  BEFORE: 'BEFORE',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  AFTER: 'AFTER',
  ABOVE: 'ABOVE',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  BELOW: 'BELOW',
};

const HORIZONTAL_POSITIONS = [
  POSITIONS.BEFORE,
  POSITIONS.LEFT,
  POSITIONS.RIGHT,
  POSITIONS.AFTER,
];

const VERTICAL_POSITIONS = [
  POSITIONS.ABOVE,
  POSITIONS.TOP,
  POSITIONS.BOTTOM,
  POSITIONS.BELOW,
];

const DEFAULT_VERTICAL_POSITION = POSITIONS.BELOW;

const DEFAULT_HORIZONTAL_POSITION = POSITIONS.LEFT;

class PopUpAnchor extends React.Component {
  static propTypes = {
    popUpHeightMatchesAnchorHeight: PropTypes.bool,
    popUpWidthMatchesAnchorWidth: PropTypes.bool,
    popUpPosition: PropTypes.oneOfType([
      PropTypes.oneOf([
        POSITIONS.BEFORE,
        POSITIONS.LEFT,
        POSITIONS.RIGHT,
        POSITIONS.AFTER,
        POSITIONS.ABOVE,
        POSITIONS.TOP,
        POSITIONS.BOTTOM,
        POSITIONS.BELOW,
      ]),
      PropTypes.shape({
        horizontal: PropTypes.oneOf([
          POSITIONS.BEFORE,
          POSITIONS.LEFT,
          POSITIONS.RIGHT,
          POSITIONS.AFTER,
        ]),
        vertical: PropTypes.oneOf([
          POSITIONS.ABOVE,
          POSITIONS.TOP,
          POSITIONS.BOTTOM,
          POSITIONS.BELOW,
        ]),
      }),
    ]),
    popUpSpacing: PropTypes.number,

    anchor: PropTypes.element.isRequired,
    children: PropTypes.node,
    displayPopUp: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    popUpHeightMatchesAnchorHeight: false,
    popUpWidthMatchesAnchorWidth: false,
    popUpPosition: {
      horizontal: POSITIONS.LEFT,
      vertical: POSITIONS.BELOW,
    },
    popUpSpacing: 16,
  };

  state = {
    horizontalPosition: null,
    verticalPosition: null,
  };

  static getDerivedStateFromProps({ popUpPosition }) {
    if (typeof popUpPosition === 'string') {
      if (HORIZONTAL_POSITIONS.some(position => position === popUpPosition)) {
        return {
          horizontalPosition: popUpPosition,
          verticalPosition: DEFAULT_VERTICAL_POSITION,
        };
      }

      if (VERTICAL_POSITIONS.some(position => position === popUpPosition)) {
        return {
          horizontalPosition: DEFAULT_HORIZONTAL_POSITION,
          verticalPosition: popUpPosition,
        };
      }

      return {
        horizontalPosition: DEFAULT_HORIZONTAL_POSITION,
        verticalPosition: DEFAULT_VERTICAL_POSITION,
      };
    }

    return {
      horizontalPosition:
        popUpPosition.horizontal || DEFAULT_HORIZONTAL_POSITION,
      verticalPosition: popUpPosition.vertical || DEFAULT_VERTICAL_POSITION,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.popUpNode = document.createElement('div');
    document.body.appendChild(this.popUpNode);
  }

  componentDidMount() {
    if (window) {
      window.addEventListener('resize', this.windowResizeHandler);
      window.addEventListener('scroll', this.scrollHandler, true);
    }
    this.updatePopUp();
  }

  componentWillUnmount() {
    document.body.removeChild(this.popUpNode);
    if (window) {
      window.removeEventListener('resize', this.windowResizeHandler);
      window.removeEventListener('scroll', this.scrollHandler, true);
    }
  }

  componentDidUpdate() {
    this.updatePopUp();
  }

  updatePopUp() {
    const {
      popUpHeightMatchesAnchorHeight,
      popUpWidthMatchesAnchorWidth,
      displayPopUp,
      popUpSpacing,
    } = this.props;
    const { horizontalPosition, verticalPosition } = this.state;

    const { popUpNode } = this;
    popUpNode.style.display = 'none';
    // eslint-disable-next-line react/no-find-dom-node
    const anchorNode = ReactDOM.findDOMNode(this);
    const anchorBounds = anchorNode.getBoundingClientRect();
    const scroll = getComputedScroll(anchorNode);

    popUpNode.style.display = displayPopUp ? null : 'none';
    popUpNode.style.position = 'absolute';

    this.popUpNode.style.height = popUpHeightMatchesAnchorHeight
      ? `${anchorBounds.height}px`
      : null;

    this.popUpNode.style.width = popUpWidthMatchesAnchorWidth
      ? `${anchorBounds.width}px`
      : null;

    const {
      width: popupNodeWidth,
      height: popupNodeHeight,
    } = popUpNode.getBoundingClientRect();

    const nodeBounds = {
      left: anchorBounds.left,
      top: anchorBounds.top,
    };

    switch (horizontalPosition) {
      case POSITIONS.BEFORE:
        nodeBounds.left = anchorBounds.left - popupNodeWidth;
        break;
      case POSITIONS.LEFT:
        nodeBounds.left = anchorBounds.left;
        break;
      case POSITIONS.RIGHT:
        nodeBounds.left = anchorBounds.right - popupNodeWidth;
        break;
      case POSITIONS.AFTER:
        nodeBounds.left = anchorBounds.right;
        break;
      default:
        break;
    }

    switch (verticalPosition) {
      case POSITIONS.ABOVE:
        nodeBounds.top = anchorBounds.top - popupNodeHeight;
        break;
      case POSITIONS.TOP:
        nodeBounds.top = anchorBounds.top;
        break;
      case POSITIONS.BOTTOM:
        nodeBounds.top = anchorBounds.bottom - popupNodeHeight;
        break;
      case POSITIONS.BELOW:
        nodeBounds.top = anchorBounds.bottom;
        break;
      default:
        break;
    }

    if (
      document.documentElement.clientHeight <
      popUpSpacing +
        popupNodeHeight +
        nodeBounds.top -
        (scroll.height - scroll.top)
    ) {
      nodeBounds.top +=
        document.documentElement.clientHeight -
        (popUpSpacing + popupNodeHeight + nodeBounds.top) +
        (scroll.height - scroll.top);
    }

    this.popUpNode.style.top = `${nodeBounds.top}px`;
    this.popUpNode.style.left = `${nodeBounds.left}px`;
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
    this.updatePopUp();
  };

  scrollHandler = event => {
    if (!this.popUpNode.contains(event.target)) {
      this.updatePopUp();
    }
  };
}

PopUpAnchor.positions = POSITIONS;

export default PopUpAnchor;

const getComputedScroll = domNode => {
  const scroll = {
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  };

  while (domNode && domNode !== document) {
    const { overflowY, overflowX } = window.getComputedStyle(domNode);

    if (overflowY !== 'visible') {
      scroll.top += domNode.scrollTop;
      scroll.height += domNode.scrollHeight - domNode.clientHeight;
    }

    if (overflowX !== 'visible') {
      scroll.left += domNode.scrollLeft;
      scroll.width += domNode.scrollWidth - domNode.clientWidth;
    }

    domNode = domNode.parentNode;
  }

  return scroll;
};
