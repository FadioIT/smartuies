import React from 'react';
import PropTypes from 'prop-types';
import { TabPanel, themeComponent } from '@fadioit/smartuies';
import { StyleSheet, css } from '../utils/styleUtils';
import { fontSizes } from '../theme';
import Ellipsis from './Ellipsis';

export const renderTabList = ({ tabList, selectedTab, onChange }) => (
  <div className={styles.list}>
    {tabList.map((tab, index) => {
      const selected = selectedTab === index;

      return (
        <button
          key={tab.key}
          className={css(styles.button, selected && styles.buttonSelected)}
          type="button"
          onClick={() => onChange(index)}
        >
          <span
            className={css(
              styles.buttonSerif,
              selected && styles.buttonSerifSelected,
            )}
          />
          <Ellipsis>{tab.label}</Ellipsis>
        </button>
      );
    })}
  </div>
);

renderTabList.propTypes = {
  tabList: PropTypes.array.isRequired,
  selectedTab: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export const theme = { renderTabList };

export default themeComponent(TabPanel, theme);

const styles = StyleSheet.create({
  list: {
    background: '#e1e5e9',
    display: 'flex',
    padding: '8px 16px 0',
    borderBottom: '4px solid #FFF',
  },
  button: {
    border: 'none',
    borderRadius: '6px 6px 0 0',
    boxShadow: '9px 0 0 -8px #999da1',
    background: 'none',
    color: '#565a5f',
    display: 'flex',
    fontSize: fontSizes.normal,
    padding: 8,
    outline: 'none',
    transition: 'all .2s',
    minWidth: 0,
    width: 240,
    position: 'relative',
    alignItems: 'center',
    '&:hover': {
      background: '#f5f6f7',
      boxShadow: 'none',
    },
    '&:hover > span': {
      opacity: 1,
    },
  },
  buttonSelected: {
    boxShadow: 'none',
    zIndex: 1,
    '&,&:hover': {
      background: '#FFF',
    },
  },
  buttonSerif: {
    color: '#F5F6F7',
    position: 'absolute',
    top: 6,
    bottom: 0,
    right: -12,
    left: -12,
    overflow: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all .2s',
    '&:before': {
      content: "''",
      boxShadow: '0 0 0 6px currentColor',
      borderRadius: '0 0 6px 0',
      display: 'block',
      position: 'absolute',
      height: '100%',
      width: 12,
      left: 0,
      bottom: 0,
    },
    '&:after': {
      content: "''",
      boxShadow: '0 0 0 6px currentColor',
      borderRadius: '0 0 0 6px',
      display: 'block',
      position: 'absolute',
      height: '100%',
      width: 12,
      right: 0,
      bottom: 0,
    },
  },
  buttonSerifSelected: {
    color: '#FFF',
    opacity: 1,
  },
});
