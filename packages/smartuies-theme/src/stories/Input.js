import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import Input from '../components/Input';

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Input
      disabled={boolean('disabled', false)}
      placeholder={text('placeholder', 'Placeholder text…')}
    />
  ));
