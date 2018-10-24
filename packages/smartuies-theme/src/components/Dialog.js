import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { StyleSheet } from '../utils/styleUtils';
import Modal from './Modal';
import Window from './Window';
import Button from './Button';
import WarningIcon from './icons/WarningIcon';

const Dialog = ({ icon, title, options, children }) => (
  <Modal isOpen>
    <Window
      head={
        <>
          {icon && <div className={styles.icon}>{icon}</div>}
          {title && <div className={styles.title}>title</div>}
        </>
      }
      foot={options}
    >
      {children}
    </Window>
  </Modal>
);

Dialog.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.node,
  options: PropTypes.node,
  children: PropTypes.node,
};

export default Dialog;

export const dialog = (title, icon, message, options) => {
  const node = document.createElement('div');
  document.body.appendChild(node);

  const result = new Promise(resolve => {
    ReactDOM.render(
      <Dialog
        title={title}
        icon={icon}
        options={options.map(({ label, value, ...otherOptions }) => (
          <Button key={label} onClick={() => resolve(value)} {...otherOptions}>
            {label}
          </Button>
        ))}
      >
        {message}
      </Dialog>,
      node,
    );
  }).then(() => {
    ReactDOM.unmountComponentAtNode(node);
    document.body.removeChild(node);
  });

  return result;
};

export const confirm = text =>
  dialog('Confirmation', <WarningIcon />, text, [
    {
      label: 'Annuler',
      value: false,
      kind: 'fatal',
      light: true,
      outline: false,
      className: styles.button,
    },
    {
      label: 'Ok',
      value: true,
      kind: 'primary',
      className: styles.button,
    },
  ]);

export const alert = text =>
  dialog('Alerte', <WarningIcon />, text, [
    {
      label: 'Ok',
      value: true,
      kind: 'primary',
      className: styles.button,
    },
  ]);

const styles = StyleSheet.create({
  icon: {
    display: 'flex',
    marginRight: 8,
  },
  title: {
    alignSelf: 'center',
  },
  button: {
    marginLeft: 8,
    textTransform: 'uppercase',
  },
});
