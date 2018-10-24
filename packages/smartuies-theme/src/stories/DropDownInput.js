import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Window from '../components/Window';

import DropDownInput from '../components/DropDownInput';

storiesOf('DropDownInput', module).add('basic example', () => (
  <DropDownInput onToggle={action('onToggle')}>
    {({ dropDownRef }) => <Window ref={dropDownRef}>DropDown content</Window>}
  </DropDownInput>
));
