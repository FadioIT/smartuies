import { configure } from '@storybook/react';
import { injectGlobal } from 'emotion';
import { globals } from '../src/theme';

const loadStories = () => {
  injectGlobal({
    html: {
      fontSize: '62.5%',
    },
    body: globals,
  });
  require('../src/stories/index.js');
};

configure(loadStories, module);
