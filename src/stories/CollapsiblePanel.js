import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Panel, PanelTitle } from '../utils/storyBookUtils';

import CollapsiblePanel from '../components/CollapsiblePanel';

storiesOf('CollapsiblePannel', module).add('basic example', () => (
  <CollapsiblePanel
    onToggle={action('onToggle')}
    renderButton={({ onToggle, open }) => (
      <PanelTitle open={open} role="button" onClick={onToggle}>
        <span style={{ display: 'inline-block', width: '1em' }}>
          {open ? '▾' : '▸'}
        </span>{' '}
        Panel title
      </PanelTitle>
    )}
  >
    {() => <Panel>Collapsible content</Panel>}
  </CollapsiblePanel>
));
