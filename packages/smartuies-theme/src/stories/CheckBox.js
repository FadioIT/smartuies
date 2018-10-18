import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CheckBox from '../components/CheckBox';

storiesOf('CheckBox', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <CheckBox
      disabled={boolean('disabled', false)}
      onChange={action('onChange')}
    />
  ))
  .add('controlled example', () => (
    <CheckBox
      disabled={boolean('disabled', false)}
      checked={boolean('checked', false)}
      onChange={action('onChange')}
    />
  ));
