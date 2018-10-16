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
      displayPopUp,
    } = this.props;
    const { horizontalPosition, verticalPosition } = this.state;

    // eslint-disable-next-line react/no-find-dom-node
    const anchorNode = ReactDOM.findDOMNode(this);
    const anchorBounds = anchorNode.getBoundingClientRect();

    const { popUpNode } = this;
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

    switch (horizontalPosition) {
      case POSITIONS.BEFORE:
        this.popUpNode.style.left = `${anchorBounds.left - popupNodeWidth}px`;
        break;
      case POSITIONS.LEFT:
        this.popUpNode.style.left = `${anchorBounds.left}px`;
        break;
      case POSITIONS.RIGHT:
        this.popUpNode.style.left = `${anchorBounds.right - popupNodeWidth}px`;
        break;
      case POSITIONS.AFTER:
        this.popUpNode.style.left = `${anchorBounds.right}px`;
        break;
      default:
        break;
    }

    switch (verticalPosition) {
      case POSITIONS.ABOVE:
        this.popUpNode.style.top = `${anchorBounds.top - popupNodeHeight}px`;
        break;
      case POSITIONS.TOP:
        this.popUpNode.style.top = `${anchorBounds.top}px`;
        break;
      case POSITIONS.BOTTOM:
        this.popUpNode.style.top = `${anchorBounds.bottom - popupNodeHeight}px`;
        break;
      case POSITIONS.BELOW:
        this.popUpNode.style.top = `${anchorBounds.bottom}px`;
        break;
      default:
        break;
    }
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

PopUpAnchor.positions = POSITIONS;

export default PopUpAnchor;
