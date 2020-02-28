import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

export const DIRECTIONS = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
};

const TranslateTransition = ({ children, direction, ...otherProps }) => {
  if (typeof direction !== 'object') {
    direction = { vertical: direction, horizontal: direction };
  }

  const from = { x: 0, y: 0 };
  const enter = { x: 0, y: 0 };
  const leave = { x: 0, y: 0 };

  switch (direction.vertical) {
    case DIRECTIONS.TOP: {
      from.y = 1;
      enter.y = 0;
      leave.y = -1;
      break;
    }
    case DIRECTIONS.BOTTOM: {
      from.y = -1;
      enter.y = 0;
      leave.y = 1;
      break;
    }
    default:
      break;
  }

  switch (direction.horizontal) {
    case DIRECTIONS.LEFT: {
      from.x = 1;
      enter.x = 0;
      leave.x = -1;
      break;
    }
    case DIRECTIONS.RIGHT: {
      from.x = -1;
      enter.x = 0;
      leave.x = 1;
      break;
    }
    default:
      break;
  }

  return (
    <Transition
      from={{
        opacity: 0,
        transform: `translate(${from.x * 100}%, ${from.y * 100}%)`,
      }}
      enter={{
        opacity: 1,
        transform: `translate(${enter.x * 100}%, ${enter.y * 100}%)`,
      }}
      leave={{
        opacity: 0,
        transform: `translate(${leave.x * 100}%, ${leave.y * 100}%)`,
      }}
      items={children}
      {...otherProps}
    >
      {children}
    </Transition>
  );
};

TranslateTransition.propTypes = {
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(Object.values(DIRECTIONS)),
    PropTypes.shape({
      x: PropTypes.oneOf([DIRECTIONS.LEFT, DIRECTIONS.RIGHT]),
      y: PropTypes.oneOf([DIRECTIONS.TOP, DIRECTIONS.BOTTOM]),
    }),
  ]),
  children: PropTypes.node,
};

TranslateTransition.defaultProps = {
  direction: DIRECTIONS.LEFT,
};

export default TranslateTransition;
