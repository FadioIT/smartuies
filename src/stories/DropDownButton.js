import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button, Input, Window } from '../utils/storyBookUtils';

import DropDownButton from '../components/DropDownButton';

storiesOf('DropDownButton', module)
  .add('basic example', () => (
    <DropDownButton
      onToggle={action('onToggle')}
      renderButton={({ buttonRef, onToggle, open }) => (
        <Button ref={buttonRef} onClick={onToggle}>
          {open ? 'Close dropDown' : 'Open dropDown'}
        </Button>
      )}
    >
      {({ dropDownRef }) => <Window ref={dropDownRef}>DropDown content</Window>}
    </DropDownButton>
  ))
  .add('input as button', () => (
    <DropDownButton
      onToggle={action('onToggle')}
      renderButton={({ buttonRef, onToggle, open }) => (
        <Input ref={buttonRef} onFocus={!open && onToggle} value="Focus me" />
      )}
    >
      {({ dropDownRef }) => <Window ref={dropDownRef}>DropDown content</Window>}
    </DropDownButton>
  ));
