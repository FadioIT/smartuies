import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, date } from '@storybook/addon-knobs';
import DropDownInput from '../components/DropDownInput';
import Window from '../components/Window';

import Calendar from '../components/Calendar';

const dateKnob = (name, defaultValue) => {
  const value = date(name, defaultValue);
  return value ? Number(value) : undefined;
};

storiesOf('Calendar', module)
  .addDecorator(withKnobs)
  .add('basic example', () => (
    <Calendar
      onChange={action('onChange')}
      selectedDate={Date.now() + 3 * 24 * 60 * 60 * 1000}
      minDate={dateKnob('minDate', null)}
      maxDate={dateKnob('maxDate', null)}
    />
  ))
  .add('dropDown', () => (
    <DropDownInput onToggle={action('onToggle')} focusDropDown>
      {({ dropDownRef, onKeyDown }) => (
        <Window>
          <Calendar
            onKeyDown={onKeyDown}
            calendarRef={dropDownRef}
            onChange={action('onChange')}
            selectedDate={Date.now() + 3 * 24 * 60 * 60 * 1000}
            minDate={dateKnob('minDate', null)}
            maxDate={dateKnob('maxDate', null)}
          />
        </Window>
      )}
    </DropDownInput>
  ));
