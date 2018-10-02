import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { Button, Window } from '../utils/storyBookUtils';

import PopUpAnchor, { PopUpPosition } from '../components/PopUpAnchor';

storiesOf('PopUpAnchor', module)
  .addDecorator(withKnobs)
  .add('basic example', () => {
    const popUpHeightMatchesAnchorHeight = boolean(
      'Match anchor height',
      false,
    );
    const popUpWidthMatchesAnchorWidth = boolean('Match anchor width', false);
    const displayPopUp = boolean('displayPopUp', true);
    const popUpPosition = select(
      'popUpPosition',
      {
        [PopUpPosition.LEFT]: 'Left',
        [PopUpPosition.RIGHT]: 'Right',
        [PopUpPosition.ABOVE]: 'Above',
        [PopUpPosition.BELOW]: 'Below',
        [PopUpPosition.TOP_LEFT]: 'Top left',
      },
      PopUpPosition.BELOW,
    );

    return (
      <PopUpAnchor
        popUpHeightMatchesAnchorHeight={popUpHeightMatchesAnchorHeight}
        popUpWidthMatchesAnchorWidth={popUpWidthMatchesAnchorWidth}
        popUpPosition={popUpPosition}
        anchor={<Button>Anchor element</Button>}
        displayPopUp={displayPopUp}
      >
        <Window>PopUp</Window>
      </PopUpAnchor>
    );
  });
