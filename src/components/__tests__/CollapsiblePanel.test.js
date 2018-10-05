import React from 'react';
import { shallow, mount } from 'enzyme';
import CollapsiblePanel from '../CollapsiblePanel';

const getElement = () => (
  <CollapsiblePanel
    renderButton={({ onToggle, open }) => (
      <button id="test-button" type="button" onClick={onToggle}>
        {open ? 'Close' : 'Open'}
      </button>
    )}
  >
    {() => <div id="test-panel">Panel content</div>}
  </CollapsiblePanel>
);

it('renders the button and the panel', () => {
  const wrapper = shallow(getElement());
  expect(wrapper.find('#test-button').length).toEqual(1);
  expect(wrapper.find('#test-panel').length).toEqual(1);
  expect(wrapper).toMatchSnapshot();
});

it('removes the panel when calling onToggle', () => {
  const wrapper = mount(getElement());

  wrapper.find('#test-button').simulate('click');
  expect(wrapper.find('#test-panel').length).toEqual(0);
  expect(wrapper).toMatchSnapshot();
});

it('re-renders the panel when calling onToggle twice', () => {
  const wrapper = mount(getElement());

  wrapper.find('#test-button').simulate('click');
  expect(wrapper.find('#test-panel').length).toEqual(0);
  wrapper.find('#test-button').simulate('click');
  expect(wrapper.find('#test-panel').length).toEqual(1);
});
