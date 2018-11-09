import React from 'react';
import { mount } from 'enzyme';
import ReactDOM from 'react-dom';
import ClickOut from '../ClickOut';

const getConfig = () => {
  const map = {};

  document.addEventListener = jest.fn((event, callback) => {
    map[event] = callback;
  });

  const props = {
    onClickOut: jest.fn(),
  };

  const wrapper = mount(
    <div>
      <ClickOut
        {...props}
        renderContainer={({ container, children }) => (
          <div ref={container}>{children}</div>
        )}
      >
        <span>test</span>
      </ClickOut>
    </div>,
  );

  return {
    wrapper,
    map,
    props,
  };
};

describe('ClickOut', () => {
  it('should not call action on click inside the component', () => {
    const { wrapper, map, props } = getConfig();

    map.click({
      target: ReactDOM.findDOMNode(wrapper.find('span').instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).not.toHaveBeenCalled();
  });

  it('should not call action on touch inside the component', () => {
    const { wrapper, map, props } = getConfig();

    map.touchstart({
      target: ReactDOM.findDOMNode(wrapper.find('span').instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).not.toHaveBeenCalled();
  });

  it('should call action on click outside the component', () => {
    const { wrapper, map, props } = getConfig();

    map.click({
      target: ReactDOM.findDOMNode(wrapper.instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).toHaveBeenCalled();
  });

  it('should call action on touch outside the component', () => {
    const { wrapper, map, props } = getConfig();

    map.touchstart({
      target: ReactDOM.findDOMNode(wrapper.instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).toHaveBeenCalled();
  });

  it('should not call action on click in the component', () => {
    const { wrapper, map, props } = getConfig();

    map.click({
      target: ReactDOM.findDOMNode(wrapper.find(ClickOut).instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).not.toHaveBeenCalled();
  });

  it('should not call action on touch in the component', () => {
    const { wrapper, map, props } = getConfig();

    map.touchstart({
      target: ReactDOM.findDOMNode(wrapper.find(ClickOut).instance()), // eslint-disable-line react/no-find-dom-node
    });

    expect(props.onClickOut).not.toHaveBeenCalled();
  });
});
