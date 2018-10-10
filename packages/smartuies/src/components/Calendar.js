import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { refPropType } from '../utils';

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

    intl: PropTypes.shape({}),

    firstDayOfWeek: PropTypes.number,
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
      displayedYear: activeDate.getFullYear(),
      displayedMonth: activeDate.getMonth(),
      activeDate,
    };
  };

  render() {
    const { displayedYear, displayedMonth } = this.state;
    const renderProps = {
      onYearMove: this.onYearMove,
      onMonthMove: this.onMonthMove,
      onDateMove: this.onDateMove,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,

      longDisplayedYear: displayedYear,
      shortDisplayedYear: displayedYear, // @TODO
      longDisplayedMonth: formatDate(
        new Date(displayedYear, displayedMonth, 1),
        'fr',
        { month: 'long' },
      ),
      shortDisplayedMonth: formatDate(
        new Date(displayedYear, displayedMonth, 1),
        'fr',
        { month: 'short' },
      ),
      longDayList: daysOfWeek,
      shortDayList: daysOfWeek, // @TODO
    };

    const firstDayOfWeek =
      this.props.firstDayOfWeek != null ? this.props.firstDayOfWeek : 1;

    return this.props.renderCalendar({
      ...renderProps,
      calendarRef: this.calendarRef,
      children: getWeekList(displayedMonth, displayedYear, firstDayOfWeek).map(
        dayList => (
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
        ),
      ),
    });
  }

  renderDay = (renderProps, date) => {
    const { displayedMonth, activeDate } = this.state;
    const { selectedDate } = this.props;

    const today = new Date();
    const currentSelectedDate = new Date(selectedDate);

    const isInDisplayedMonth = date.getMonth() === displayedMonth;
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

    const longLabel = formatDate(date, 'fr', { day: '2-digit' });
    const shortLabel = formatDate(date, 'fr', { day: 'numeric' });

    return this.props.renderDay({
      ...renderProps,
      date,
      isInDisplayedMonth,
      isSelected,
      isActive,
      isToday,
      longLabel,
      shortLabel,
    });
  };

  onYearMove = diff => {
    if (diff) {
      this.setState(({ activeDate }) =>
        Calendar.getStateFromActiveDate(
          new Date(activeDate).setFullYear(
            activeDate.getFullYear() + diff,
            activeDate.getMonth() + (diff > 0 ? 0 : 1),
            diff > 0 ? 1 : 0,
          ),
          this.props,
        ),
      );
    }
  };

  onMonthMove = diff => {
    if (diff) {
      this.setState(({ activeDate }) =>
        Calendar.getStateFromActiveDate(
          new Date(activeDate).setFullYear(
            activeDate.getFullYear(),
            activeDate.getMonth() + diff + (diff > 0 ? 0 : 1),
            diff > 0 ? 1 : 0,
          ),
          this.props,
        ),
      );
    }
  };

  onDateMove = diff => {
    if (diff) {
      this.setState(({ activeDate }) =>
        Calendar.getStateFromActiveDate(
          new Date(activeDate).setDate(activeDate.getDate() + diff),
          this.props,
        ),
      );
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
        this.onMonthMove(-1);
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.PAGE_DOWN:
        this.onMonthMove(1);
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.UP:
        this.onDateMove(-7);
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.DOWN:
        this.onDateMove(7);
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.LEFT:
        this.onDateMove(-1);
        this.onFocus();
        e.preventDefault();
        break;
      case KEY_CODES.RIGHT:
        this.onDateMove(1);
        this.onFocus();
        e.preventDefault();
        break;

      case KEY_CODES.HOME:
        this.onMonthMove(-1);
        this.onDateMove(1);
        e.preventDefault();
        break;
      case KEY_CODES.END:
        this.onMonthMove(1);
        this.onDateMove(-1);
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

const daysOfWeek = ['lu', 'ma', 'me', 'je', 've', 'sa', 'di'];

function getFirstWeekDayList(displayedMonth, displayedYear, firstDayOfWeek) {
  const date = new Date(displayedYear, displayedMonth, 1);
  const weeks = [];
  while (date.getMonth() === displayedMonth) {
    while (date.getDay() !== firstDayOfWeek) {
      date.setDate(date.getDate() - 1);
    }
    weeks.push(new Date(date.getTime()));
    date.setDate(date.getDate() + 7);
  }
  return weeks;
}

export const getWeekList = (displayedMonth, displayedYear, firstDayOfWeek) =>
  getFirstWeekDayList(displayedMonth, displayedYear, firstDayOfWeek).map(
    date => {
      const days = [];
      let i = 0;
      do {
        days.push(new Date(date.getTime()));
        date.setDate(date.getDate() + 1);
        i++;
      } while (i < 7);
      return days;
    },
  );

const formatDate = (date, locale, format) =>
  new Intl.DateTimeFormat(locale, format).format(date);

const KEY_CODES = {
  ENTER: 13,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
