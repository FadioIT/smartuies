import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, themeComponent } from '@fadioit/smartuies';
import { StyleSheet, css } from '../utils/styleUtils';
import { fonts, fontSizes } from '../theme';
import Button from './Button';
import ChevronLeft from './icons/ChevronLeft';
import ChevronRight from './icons/ChevronRight';
import TranslateTransition, {
  DIRECTIONS as TranslateDirections,
} from './transitions/Translate';

const Cell = ({ children }) => <div className={styles.cell}>{children}</div>;
Cell.propTypes = {
  children: PropTypes.any,
};

class CalendarView extends React.Component {
  // eslint-disable-next-line react/no-unused-state
  state = { lastActiveDate: new Date(), direction: null };

  static getDerivedStateFromProps({ activeDate }, { lastActiveDate }) {
    const activeTime = activeDate.getTime();
    const previousTime = lastActiveDate.getTime();

    if (activeTime === previousTime) {
      return null;
    }

    if (activeTime < previousTime) {
      return {
        lastActiveDate: activeDate,
        direction: TranslateDirections.RIGHT,
      };
    }

    return {
      lastActiveDate: activeDate,
      direction: TranslateDirections.LEFT,
    };
  }

  render() {
    const { direction } = this.state;
    const {
      children,
      calendarRef,
      onKeyDown,
      adapter,
      activeDate,
      onActiveDateMove,
    } = this.props;
    const key = `${activeDate.getMonth()}-${activeDate.getFullYear()}`;

    return (
      <div
        ref={calendarRef}
        onKeyDown={onKeyDown}
        role="tree"
        tabIndex={0}
        className={styles.container}
      >
        <div className={styles.monthHeader}>
          <div className={styles.monthPrev}>
            <Button
              outline={false}
              round
              onClick={() => onActiveDateMove({ month: -1 })}
            >
              <ChevronLeft />
            </Button>
          </div>
          <div className={styles.monthLabel}>
            <TranslateTransition keys={key} direction={direction}>
              {transitionStyles => (
                <div
                  className={styles.monthLabelValue}
                  style={transitionStyles}
                >
                  {adapter.formatMonthName(activeDate)}{' '}
                  {adapter.formatYear(activeDate)}
                </div>
              )}
            </TranslateTransition>
          </div>
          <div className={styles.monthNext}>
            <Button
              outline={false}
              round
              className={styles.monthButton}
              onClick={() => onActiveDateMove({ month: 1 })}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.row}>
            {adapter.getWeekDays().map(weekDay => (
              <Cell key={weekDay}>
                <abbr
                  className={styles.dayHead}
                  title={adapter.formatWeekDayName(weekDay)}
                >
                  {adapter.formatWeekDayName(weekDay, true)}
                </abbr>
              </Cell>
            ))}
          </div>
          <div className={styles.calendar}>
            <TranslateTransition keys={key} direction={direction}>
              {transitionStyles => (
                <div className={styles.calendarWrap} style={transitionStyles}>
                  {children}
                </div>
              )}
            </TranslateTransition>
          </div>
        </div>
      </div>
    );
  }
}

CalendarView.propTypes = {
  children: PropTypes.any.isRequired,
  calendarRef: PropTypes.any,
  onKeyDown: PropTypes.func.isRequired,
  onActiveDateMove: PropTypes.func.isRequired,
  adapter: PropTypes.func.isRequired,
  activeDate: PropTypes.object.isRequired,
};

const renderCalendar = props => <CalendarView {...props} />;

const renderWeek = ({ children }) => (
  <div className={styles.row}>{children}</div>
);
renderWeek.propTypes = {
  children: PropTypes.any.isRequired,
};

const renderDay = ({
  date,
  isActive,
  isInDisplayedMonth,
  isSelected,
  isToday,
  onChange,
  adapter,
}) => (
  <Cell>
    {isInDisplayedMonth && (
      <Button
        onClick={() => onChange(date.getTime())}
        disabled={!isInDisplayedMonth}
        round
        full
        kind={
          (isSelected && 'primary') || (isActive && 'secondary') || undefined
        }
        outline={isToday}
        className={css(styles.dayBtn)}
      >
        {adapter.formatDay(date, true)}
      </Button>
    )}
  </Cell>
);
renderDay.propTypes = {
  date: PropTypes.shape({ getTime: PropTypes.func.isRequired }).isRequired,
  isActive: PropTypes.bool.isRequired,
  isInDisplayedMonth: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  adapter: PropTypes.func.isRequired,
};

export const theme = {
  renderCalendar,
  renderWeek,
  renderDay,
};

export default themeComponent(Calendar, theme);

const styles = StyleSheet.create({
  container: {
    fontFamily: fonts.normal,
    outline: 'none',
    width: 280,
  },
  monthHeader: {
    display: 'flex',
  },
  monthPrev: {
    display: 'flex',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    margin: 4,
  },
  monthNext: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    margin: 4,
  },
  monthLabel: {
    display: 'flex',
    flexGrow: 1,
    margin: 4,
    overflow: 'hidden',
  },
  monthLabelValue: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    '& + &': {
      marginLeft: '-100%',
    },
  },

  dayHead: {
    display: 'flex',
    flexGrow: 1,
    flexBasis: 0,
    fontSize: fontSizes.small,
    fontWeight: 'bold',
    margin: 'auto',
    textDecoration: 'none',
  },

  calendarContainer: {
    display: 'flex',
    flexGrow: 1,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  calendar: {
    display: 'flex',
    '&:after': {
      paddingTop: `${(100 / 7) * 6}%`,
      position: 'relative',
    },
  },
  calendarWrap: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    width: '100%',
    '& + &': {
      marginLeft: '-100%',
    },
  },

  dayBtn: {
    padding: 0,
    transition: 'all .2s',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    width: '100%',
  },
  cell: {
    display: 'flex',
    flexBasis: 0,
    flexGrow: 1,
    flexShrink: 0,
    margin: 4,
  },
});
