import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Window } from '../utils/storyBookUtils';

import DropDownButton from '../components/DropDownButton';

storiesOf('DropDownButton', module).add('basic example', () => (
  <DropDownButton onToggle={action('onToggle')} buttonLabel="Toggle button">
    {({ dropDownRef }) => <Window ref={dropDownRef}>DropDown content</Window>}
  </DropDownButton>
));
