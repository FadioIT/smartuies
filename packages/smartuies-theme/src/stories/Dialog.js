import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dialog, { dialog, confirm, alert } from '../components/Dialog';
import Button from '../components/Button';

storiesOf('Dialog', module)
  .add('basic example', () => (
    <Dialog title="This is a dialog">
      A dialog box has opened to inform you of something. We invite you to close
      it once you have read this text.
    </Dialog>
  ))
  .add('dialog async function', () => (
    <Button
      onClick={() =>
        dialog(
          'Dialog title',
          null,
          'This is a dialog box that was opened using the "dialog" function.',
          [{ label: 'close me', kind: 'primary' }],
        ).then(action('then'))
      }
    >
      Open dialog
    </Button>
  ))
  .add('confirm async function', () => (
    <Button
      onClick={() =>
        confirm(
          'This is a confirmation dialog box that was opened using the "confirm" function.',
        ).then(action('then'))
      }
    >
      Open confirm
    </Button>
  ))
  .add('alert async function', () => (
    <Button
      onClick={() =>
        alert(
          'This is an alert dialog box that was opened using the "alert" function.',
        ).then(action('then'))
      }
    >
      Open alert
    </Button>
  ));
