import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TabPanel from '../components/TabPanel';

storiesOf('TabPanel', module)
  .add('basic example', () => (
    <TabPanel
      onChange={action('onChange')}
      tabList={[
        { key: 1, label: 'This is a tab' },
        { key: 2, label: 'And another one' },
        { key: 3, label: 'Last but not least' },
      ]}
    >
      {({ tab }) => (
        <div>
          Panel for <strong>{tab.label}</strong>
        </div>
      )}
    </TabPanel>
  ))
  .add('single tab', () => (
    <TabPanel
      onChange={action('onChange')}
      tabList={[{ key: 1, label: 'A single tab' }]}
    >
      {({ tab }) => (
        <div>
          Panel for <strong>{tab.label}</strong>
        </div>
      )}
    </TabPanel>
  ));
