import React from 'react';
import PropTypes from 'prop-types';
import { renderChildren, childrenPropType } from '../utils';

class TabPanel extends React.Component {
  static propTypes = {
    children: childrenPropType.isRequired,
    renderTabList: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    tabList: PropTypes.array.isRequired,
    defaultTab: PropTypes.number,
  };

  state = { selectedTab: null };

  static getDerivedStateFromProps(props, { selectedTab }) {
    if (selectedTab === null) {
      selectedTab = props.defaultTab || 0;
    }
    if (selectedTab >= props.tabList.length) {
      selectedTab = props.tabList.length - 1;
    }

    return { selectedTab };
  }

  onChange = selectedTab => {
    this.setState(
      () => ({ selectedTab }),
      () => {
        if (this.props.onChange) {
          this.props.onChange(this.state.selectedTab);
        }
      },
    );
  };

  render() {
    const { children, renderTabList, tabList } = this.props;
    const { selectedTab } = this.state;

    return (
      <>
        {renderTabList({
          selectedTab,
          onChange: this.onChange,
          tabList,
        })}
        {tabList[selectedTab] &&
          renderChildren(children, {
            index: selectedTab,
            tab: tabList[selectedTab],
            onChange: this.onChange,
          })}
      </>
    );
  }
}

export default TabPanel;
