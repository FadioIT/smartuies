import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, themeComponent } from '@fadioit/smartuies';
import { StyleSheet, css } from '../utils/styleUtils';
import { fonts } from '../theme';
import Button from './Button';

const Cell = ({ children }) => (
  <div className={styles.cell}>
    <div className={styles.cellWrap}>{children}</div>
  </div>
);
Cell.propTypes = {
  children: PropTypes.any,
};

const renderCalendar = props => {
  const {
    children,
    calendarRef,
    onKeyDown,
    longDisplayedYear,
    longDisplayedMonth,
    shortDayList,
    longDayList,
    onMonthMove,
  } = props;
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
          <Button onClick={() => onMonthMove(-1)}>prev</Button>
        </div>
        <div className={styles.monthLabel}>
          {longDisplayedMonth} / {longDisplayedYear}
        </div>
        <div className={styles.monthNext}>
          <Button className={styles.monthButton} onClick={() => onMonthMove(1)}>
            next
          </Button>
        </div>
      </div>
      <div className={styles.row}>
        {shortDayList.map((day, key) => (
          <Cell key={day}>
            <abbr className={styles.dayHead} title={longDayList[key]}>
              {day}
            </abbr>
          </Cell>
        ))}
      </div>
      <div className={styles.calendar}>
        <div className={styles.calendarWrap}>{children}</div>
      </div>
    </div>
  );
};
renderCalendar.propTypes = {
  children: PropTypes.any.isRequired,
  calendarRef: PropTypes.any,
  onKeyDown: PropTypes.func.isRequired,
  longDisplayedYear: PropTypes.string.isRequired,
  longDisplayedMonth: PropTypes.string.isRequired,
  shortDayList: PropTypes.arrayOf(PropTypes.string).isRequired,
  longDayList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onMonthMove: PropTypes.func.isRequired,
};

const renderWeek = ({ children }) => (
  <div className={styles.row}>{children}</div>
);
renderWeek.propTypes = {
  children: PropTypes.any.isRequired,
};

const renderDay = ({
  date,
  shortLabel,
  isActive,
  isInDisplayedMonth,
  isSelected,
  isToday,
  onChange,
}) => (
  <Cell>
    {isInDisplayedMonth && (
      <Button
        onClick={() => onChange(date.getTime())}
        disabled={!isInDisplayedMonth}
        kind={
          (isSelected && 'primary') || (isActive && 'secondary') || undefined
        }
        outline={isToday}
        className={css(styles.dayBtn)}
      >
        {shortLabel}
      </Button>
    )}
  </Cell>
);
renderDay.propTypes = {
  date: PropTypes.shape({ getTime: PropTypes.func.isRequired }).isRequired,
  shortLabel: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isInDisplayedMonth: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  isToday: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
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
    width: 360,
  },
  monthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  monthPrev: {
    display: 'flex',
    flexGrow: 1,
    margin: 4,
  },
  monthNext: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    margin: 4,
  },
  monthLabel: {
    alignItems: 'center',
    display: 'flex',
    flexGrow: 0,
    margin: 4,
  },

  dayHead: {
    display: 'flex',
    flexGrow: 1,
    fontWeight: 'bold',
    margin: 'auto',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textDecoration: 'none',
  },

  calendar: {
    paddingTop: `${(100 / 7) * 6}%`,
    position: 'relative',
  },
  calendarWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },

  dayBtn: {
    borderRadius: '100%',
    height: '100%',
    width: '100%',
    padding: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .2s',
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  cell: {
    display: 'flex',
    flexGrow: 1,
    position: 'relative',
    margin: 4,
  },
  cellWrap: {
    paddingTop: '100%',
  },
});
