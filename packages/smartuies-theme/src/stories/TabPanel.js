import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Panel } from '../utils/storyBookUtils';

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
        <Panel>
          Panel for <strong>{tab.label}</strong>
        </Panel>
      )}
    </TabPanel>
  ))
  .add('single tab', () => (
    <TabPanel
      onChange={action('onChange')}
      tabList={[{ key: 1, label: 'A single tab' }]}
    >
      {({ tab }) => (
        <Panel>
          Panel for <strong>{tab.label}</strong>
        </Panel>
      )}
    </TabPanel>
  ));
