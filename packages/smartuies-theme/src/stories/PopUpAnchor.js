import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { PopUpAnchor } from '@fadioit/smartuies';
import { Window } from '../utils/storyBookUtils';
import Button from '../components/Button';

const { positions } = PopUpAnchor;

storiesOf('PopUpAnchor', module)
  .addDecorator(withKnobs)
  .add('basic example', () => {
    const popUpHeightMatchesAnchorHeight = boolean(
      'Match anchor height',
      false,
    );
    const popUpWidthMatchesAnchorWidth = boolean('Match anchor width', false);
    const displayPopUp = boolean('displayPopUp', true);
    const horizontalPosition = select(
      'popUpPosition.horizontal',
      {
        [positions.BEFORE]: 'Before',
        [positions.LEFT]: 'Left',
        [positions.RIGHT]: 'Right',
        [positions.AFTER]: 'After',
      },
      positions.LEFT,
    );
    const verticalPosition = select(
      'popUpPosition.vertical',
      {
        [positions.ABOVE]: 'Above',
        [positions.TOP]: 'Top',
        [positions.BOTTOM]: 'Bottom',
        [positions.BELOW]: 'Below',
      },
      positions.BELOW,
    );

    return (
      <PopUpAnchor
        popUpHeightMatchesAnchorHeight={popUpHeightMatchesAnchorHeight}
        popUpWidthMatchesAnchorWidth={popUpWidthMatchesAnchorWidth}
        popUpPosition={{
          horizontal: horizontalPosition,
          vertical: verticalPosition,
        }}
        anchor={<Button>Anchor element</Button>}
        displayPopUp={displayPopUp}
      >
        <Window>PopUp</Window>
      </PopUpAnchor>
    );
  });
