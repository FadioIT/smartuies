import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number } from '@storybook/addon-knobs';
import Button from '../components/Button';

import HomeIcon from '../components/icons/HomeIcon';

storiesOf('SVGIcon', module)
  .addDecorator(withKnobs)
  .add('basic example', () => <HomeIcon />)
  .add('button example', () => (
    <Button>
      <HomeIcon size={number('size', 24)} /> home
    </Button>
  ));
