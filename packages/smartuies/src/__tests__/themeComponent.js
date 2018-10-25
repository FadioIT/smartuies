import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { themeComponent, isThemeComponent } from '../themeComponent';

const FunctionalComponent = ({ renderFunc, ...otherProps }) => (
  <>{renderFunc(otherProps)}</>
);

// eslint-disable-next-line react/prefer-stateless-function
class ClassComponent extends React.Component {
  render() {
    const { renderFunc, ...otherProps } = this.props;
    return <>{renderFunc(otherProps)}</>;
  }
}

FunctionalComponent.propTypes = ClassComponent.propTypes = {
  renderFunc: PropTypes.func,
  defaultProps: PropTypes.bool,
};
FunctionalComponent.defaultProps = ClassComponent.defaultProps = {
  renderFunc: () => {},
  defaultProps: true,
};

describe('themeComponent', () => {
  it('returns a component with defaultProps', () => {
    const ThemedFunctionalComponent = themeComponent(FunctionalComponent, {});
    expect(ThemedFunctionalComponent).toEqual(expect.any(Function));
    expect(ThemedFunctionalComponent.defaultProps).toEqual(expect.any(Object));

    const ThemedClassComponent = themeComponent(ClassComponent, {});
    expect(ThemedClassComponent).toEqual(expect.any(Function));
    expect(ThemedClassComponent.defaultProps).toEqual(expect.any(Object));

    const ThemedTag = themeComponent('div', {});
    expect(ThemedTag).toEqual(expect.any(Function));
    expect(ThemedTag.defaultProps).toEqual(expect.any(Object));
  });

  it('merges component defaultProps with theme props', () => {
    expect(
      themeComponent(FunctionalComponent, { foo: 'bar' }).defaultProps,
    ).toEqual({
      ...FunctionalComponent.defaultProps,
      foo: 'bar',
    });

    expect(themeComponent(ClassComponent, { foo: 'bar' }).defaultProps).toEqual(
      {
        ...ClassComponent.defaultProps,
        foo: 'bar',
      },
    );
  });

  it('overrides conflicting defaultProps with theme ones', () => {
    expect(
      themeComponent(FunctionalComponent, { defaultProps: false }).defaultProps,
    ).toEqual({
      ...FunctionalComponent.defaultProps,
      defaultProps: false,
    });

    expect(
      themeComponent(ClassComponent, { defaultProps: false }).defaultProps,
    ).toEqual({
      ...ClassComponent.defaultProps,
      defaultProps: false,
    });

    expect(themeComponent('div', { defaultProps: false }).defaultProps).toEqual(
      {
        defaultProps: false,
      },
    );
  });

  it('keeps a single Theme component for nested themes', () => {
    const ThemedFunctionalComponent = themeComponent(
      themeComponent(FunctionalComponent, {}),
      {},
    );
    expect(
      mount(<ThemedFunctionalComponent />)
        .find(FunctionalComponent)
        .parents().length,
    ).toEqual(1);

    const ThemedClassComponent = themeComponent(
      themeComponent(ClassComponent, {}),
      {},
    );
    expect(
      mount(<ThemedClassComponent />)
        .find(ClassComponent)
        .parents().length,
    ).toEqual(1);

    const ThemedTag = themeComponent(themeComponent('div', {}), {});
    expect(
      mount(<ThemedTag />)
        .find('div')
        .parents().length,
    ).toEqual(1);
  });
});

describe('isThemeComponent', () => {
  it('returns true for themed class component', () => {
    const ThemedComponent = themeComponent(ClassComponent, {});
    const DoubleThemedComponent = themeComponent(ThemedComponent, {});

    expect(isThemeComponent(ThemedComponent)).toEqual(true);
    expect(isThemeComponent(DoubleThemedComponent)).toEqual(true);
  });

  it('returns true for themed functional component', () => {
    const ThemedComponent = themeComponent(FunctionalComponent, {});
    const DoubleThemedComponent = themeComponent(ThemedComponent, {});

    expect(isThemeComponent(ThemedComponent)).toEqual(true);
    expect(isThemeComponent(DoubleThemedComponent)).toEqual(true);
  });

  it('returns true for themed tag', () => {
    const ThemedTag = themeComponent('div', {});
    const DoubleThemedTag = themeComponent(ThemedTag, {});

    expect(isThemeComponent(ThemedTag)).toEqual(true);
    expect(isThemeComponent(DoubleThemedTag)).toEqual(true);
  });

  it('returns false for non-themed component', () => {
    expect(isThemeComponent(ClassComponent)).toEqual(false);
    expect(isThemeComponent(FunctionalComponent)).toEqual(false);
    expect(isThemeComponent('div')).toEqual(false);
  });
});
