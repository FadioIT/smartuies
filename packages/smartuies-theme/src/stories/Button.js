import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import Button from '../components/Button';

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Button
      disabled={boolean('disabled', false)}
      outline={boolean('outline', true)}
      light={boolean('light', false)}
      round={boolean('round', false)}
      full={boolean('full', false)}
      kind={
        select('kind', {
          '': '',
          primary: 'Primary',
          secondary: 'Secondary',
          risky: 'Risky',
          fatal: 'Fatal',
        }) || undefined
      }
    >
      {text('children', 'click me')}
    </Button>
  ));
