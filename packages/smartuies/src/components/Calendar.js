import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IntlAdapter } from '@fadioit/smartuies-i18n';
import { refPropType } from '../utils';
import { KEY_CODES } from '../constants';

class Calendar extends React.Component {
  static propTypes = {
    calendarRef: refPropType,
    selectedDate: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    minDate: PropTypes.number,
    maxDate: PropTypes.number,

    // render
    renderCalendar: PropTypes.func.isRequired,
    renderWeek: PropTypes.func.isRequired,
    renderDay: PropTypes.func.isRequired,

    adapter: PropTypes.object,
  };

  static defaultProps = {
    adapter: new IntlAdapter(),
  };

  state = {};

  calendarRef = this.props.calendarRef || React.createRef();

  static getDerivedStateFromProps({ selectedDate, minDate, maxDate }, state) {
    if (
      state.selectedDate !== selectedDate ||
      state.minDate !== minDate ||
      state.maxDate !== maxDate
    ) {
      return {
        selectedDate,
        minDate,
        maxDate,
        ...Calendar.getStateFromActiveDate(new Date(selectedDate), {
          minDate,
          maxDate,
        }),
      };
    }
    return null;
  }

  static getStateFromActiveDate = (activeDate, { minDate, maxDate }) => {
    activeDate = new Date(activeDate);
    const dateTime = activeDate.getTime();

    if (typeof minDate === 'number' && dateTime < minDate) {
      activeDate = new Date(minDate);
    } else if (typeof maxDate === 'number' && dateTime > maxDate) {
      activeDate = new Date(maxDate);
    }

    return {
      activeDate,
    };
  };

  getRenderProps = () => {
    const {
      adapter,
      calendarRef,
      selectedDate,
      onChange,
      onKeyDown,
      minDate,
      maxDate,
      renderCalendar,
      renderWeek,
      renderDay,
      ...otherProps
    } = this.props;
    const { activeDate } = this.state;

    return {
      ...otherProps,
      onActiveDateMove: this.onActiveDateMove,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      activeDate,
      selectedDate: new Date(selectedDate),
      minDate: minDate != null ? new Date(minDate) : null,
      maxDate: maxDate != null ? new Date(maxDate) : null,
      adapter,
    };
  };

  render() {
    const { activeDate } = this.state;
    const renderProps = this.getRenderProps();
    const { adapter } = renderProps;

    return this.props.renderCalendar({
      ...renderProps,
      calendarRef: this.calendarRef,
      children: getWeekList(adapter, activeDate).map(dayList => (
        <Fragment key={dayList[0].getTime()}>
          {this.props.renderWeek({
            ...renderProps,
            children: dayList.map(date => (
              <Fragment key={date.getTime()}>
                {this.renderDay(renderProps, date)}
              </Fragment>
            )),
          })}
        </Fragment>
      )),
    });
  }

  renderDay = (renderProps, date) => {
    const { activeDate } = this.state;
    const { selectedDate } = this.props;

    const today = new Date();
    const currentSelectedDate = new Date(selectedDate);

    const isInDisplayedMonth = date.getMonth() === activeDate.getMonth();
    const isSelected =
      date.getDate() === currentSelectedDate.getDate() &&
      date.getMonth() === currentSelectedDate.getMonth() &&
      date.getFullYear() === currentSelectedDate.getFullYear();
    const isActive =
      isInDisplayedMonth && date.getDate() === activeDate.getDate();
    const isToday =
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate();

    return this.props.renderDay({
      ...renderProps,
      date,
      isInDisplayedMonth,
      isSelected,
      isActive,
      isToday,
    });
  };

  onActiveDateMove = ({ year, month, date }) => {
    if (year || month || date) {
      this.setState(({ activeDate }) => {
        activeDate = new Date(activeDate);
        if (year) {
          activeDate.setFullYear(
            activeDate.getFullYear() + year,
            activeDate.getMonth() + (year > 0 ? 0 : 1),
            year > 0 ? 1 : 0,
          );
        }
        if (month) {
          activeDate.setFullYear(
            activeDate.getFullYear(),
            activeDate.getMonth() + month + (month > 0 ? 0 : 1),
            month > 0 ? 1 : 0,
          );
        }
        if (date) {
          activeDate.setDate(activeDate.getDate() + date);
        }

        return Calendar.getStateFromActiveDate(activeDate, this.props);
      });
    }
  };

  onFocus = () => {
    this.calendarRef.current.focus();
  };

  onSelect = date => {
    this.setState(() =>
      Calendar.getStateFromActiveDate(new Date(date), this.props),
    );
  };

  onChange = date => {
    date = new Date(date);
    this.setState(() => Calendar.getStateFromActiveDate(date, this.props));
    this.props.onChange(date.getTime());
  };

  onKeyDown = e => {
    switch (e.keyCode) {
      case KEY_CODES.PAGE_UP:
        this.onActiveDateMove({
          month: -1,
        });
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.PAGE_DOWN:
        this.onActiveDateMove({
          month: 1,
        });
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.UP:
        this.onActiveDateMove({
          date: -7,
        });
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.DOWN:
        this.onActiveDateMove({
          date: 7,
        });
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.LEFT:
        this.onActiveDateMove({
          date: -1,
        });
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.RIGHT:
        this.onActiveDateMove({
          date: 1,
        });
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.HOME:
        this.onActiveDateMove({
          month: -1,
          date: 1,
        });
        e.preventDefault();
        break;
      case KEY_CODES.END:
        this.onActiveDateMove({
          month: 1,
          date: -1,
        });
        e.preventDefault();
        break;

      case KEY_CODES.ENTER:
        this.onFocus();
        break;

      default:
        break;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  };
}

export default Calendar;

export const getWeekList = (adapter, date) => {
  const month = date.getMonth();
  const weekList = [];
  let firstDay = adapter.getFirstMonthDay(date);

  do {
    weekList.push(adapter.getWeekDays(firstDay));
    firstDay = adapter.addDays(weekList[weekList.length - 1][0], 7);
  } while (firstDay.getMonth() === month);

  return weekList;
};
