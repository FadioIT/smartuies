import { configure } from '@storybook/react';

const loadStories = () => {
  require('../src/stories/index.js');
};

configure(loadStories, module);
