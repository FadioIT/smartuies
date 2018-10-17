import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CollapsiblePanel from '../components/CollapsiblePanel';

storiesOf('CollapsiblePannel', module).add('basic example', () => (
  <CollapsiblePanel onToggle={action('onToggle')}>
    {() => <div>Collapsible content</div>}
  </CollapsiblePanel>
));
