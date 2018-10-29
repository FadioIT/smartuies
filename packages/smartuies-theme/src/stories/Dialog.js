import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dialog, { dialog, confirm, alert } from '../components/Dialog';
import Button from '../components/Button';

class DialogStory extends React.Component {
  static propTypes = {
    openDialog: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  openDialog = () => {
    const [promise, close] = this.props.openDialog();
    this.promise = promise;
    this.close = close;
    this.promise.then(action('then')).then(() => {
      delete this.promise;
    });
  };

  componentWillUnmount() {
    if (this.promise) {
      this.close();
    }
  }

  render() {
    return this.props.children({ openDialog: this.openDialog });
  }
}

storiesOf('Dialog', module)
  .add('basic example', () => (
    <Dialog title="This is a dialog">
      A dialog box has opened to inform you of something. We invite you to close
      it once you have read this text.
    </Dialog>
  ))
  .add('dialog async function', () => (
    <DialogStory
      openDialog={() =>
        dialog(
          'Dialog title',
          null,
          'This is a dialog box that was opened using the "dialog" function.',
          [{ label: 'close me', kind: 'primary' }],
        )
      }
    >
      {({ openDialog }) => <Button onClick={openDialog}>Open dialog</Button>}
    </DialogStory>
  ))
  .add('confirm async function', () => (
    <DialogStory
      openDialog={() =>
        confirm(
          'This is a confirmation dialog box that was opened using the "confirm" function.',
        )
      }
    >
      {({ openDialog }) => <Button onClick={openDialog}>Open confirm</Button>}
    </DialogStory>
  ))
  .add('alert async function', () => (
    <DialogStory
      openDialog={() =>
        alert(
          'This is an alert dialog box that was opened using the "alert" function.',
        )
      }
    >
      {({ openDialog }) => <Button onClick={openDialog}>Open alert</Button>}
    </DialogStory>
  ));
