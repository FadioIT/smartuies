import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';

import Ellipsis from '../components/Ellipsis';

storiesOf('Ellipsis', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Ellipsis size={number('size', 16)}>
      Here is a text that will be faded out before it overflows from its
      container, whatever the background.
    </Ellipsis>
  ));
