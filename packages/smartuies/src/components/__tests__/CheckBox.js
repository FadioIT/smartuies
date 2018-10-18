import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckBox from '../CheckBox';

it('renders', () => {
  const wrapper = shallow(<CheckBox>{() => <div />}</CheckBox>);
  expect(wrapper).toMatchSnapshot();
});

it('always provide a boolean `checked` props to children', () => {
  const children = jest.fn(() => <div />);

  mount(<CheckBox>{children}</CheckBox>);
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      checked: false,
    }),
  );

  mount(<CheckBox checked={false}>{children}</CheckBox>);
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      checked: false,
    }),
  );

  mount(<CheckBox checked>{children}</CheckBox>);
  expect(children).toHaveBeenLastCalledWith(
    expect.objectContaining({
      checked: true,
    }),
  );
});
