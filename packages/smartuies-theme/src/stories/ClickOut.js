import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ClickOut from '../components/ClickOut';

storiesOf('ClickOut', module).add('basic example', () => (
  <ClickOut onClickOut={action('onClickOut')}>
    <div>Container Content</div>
  </ClickOut>
));
