import React from 'react';
import { shallow, mount } from 'enzyme';
import DropDownButton from '../DropDownButton';
import PopUpAnchor from '../PopUpAnchor';

const getElement = () => (
  <DropDownButton
    renderButton={({ onToggle, open }) => (
      <button id="test-button" type="button" onClick={onToggle}>
        {open ? 'Close' : 'Open'}
      </button>
    )}
  >
    {({ dropDownRef }) => (
      <div id="test-container" ref={dropDownRef}>
        <div id="test-content">DropDown content</div>
      </div>
    )}
  </DropDownButton>
);

it('doesn’t render dropdown when mounting', () => {
  const wrapper = shallow(getElement());
  expect(wrapper.find(PopUpAnchor).props().displayPopUp).toEqual(false);
  expect(wrapper).toMatchSnapshot();
});

it('opens the dropdown when calling onToggle', () => {
  const wrapper = mount(getElement());

  wrapper.find('#test-button').simulate('click');
  expect(wrapper.find(PopUpAnchor).props().displayPopUp).toEqual(true);
});
