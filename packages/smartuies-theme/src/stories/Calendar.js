import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Window } from '../utils/storyBookUtils';
import DropDownInput from '../components/DropDownInput';
import Calendar from '../components/Calendar';

storiesOf('Calendar', module)
  .add('basic example', () => (
    <Calendar
      onChange={action('onChange')}
      selectedDate={Date.now() + 3 * 24 * 60 * 60 * 1000}
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
          />
        </Window>
      )}
    </DropDownInput>
  ));
