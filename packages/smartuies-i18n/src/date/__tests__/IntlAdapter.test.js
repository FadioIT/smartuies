import IntlAdapter from '../IntlAdapter';

const adapter = new IntlAdapter({ locale: 'en' });
const date = new Date('1985-02-01').getTime();

describe('formatDay', () => {
  it('returns long formats by default', () => {
    expect(adapter.formatDay(date)).toBe('01');
  });
  it('returns hadles short argument', () => {
    expect(adapter.formatDay(date, true)).toBe('1');
  });
});

describe('formatMonth', () => {
  it('returns long formats by default', () => {
    expect(adapter.formatMonth(date)).toBe('02');
  });
  it('returns hadles short argument', () => {
    expect(adapter.formatMonth(date, true)).toBe('2');
  });
});

describe('formatYear', () => {
  it('returns long formats by default', () => {
    expect(adapter.formatYear(date)).toBe('1985');
  });
  it('returns hadles short argument', () => {
    expect(adapter.formatYear(date, true)).toBe('85');
  });
});

describe('formatMonthName', () => {
  it('returns long formats by default', () => {
    expect(adapter.formatMonthName(date)).toBe('February');
  });
  it('returns hadles short argument', () => {
    expect(adapter.formatMonthName(date, true)).toBe('Feb');
  });
});

describe('formatWeekDayName', () => {
  it('returns long formats by default', () => {
    expect(adapter.formatWeekDayName(date)).toBe('Friday');
  });
  it('returns hadles short argument', () => {
    expect(adapter.formatWeekDayName(date, true)).toBe('Fri');
  });
});

describe('getWeekDays', () => {
  const weekDayNameList = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  it('returns an array containing dates for each week days', () => {
    const weekDays = adapter.getWeekDays();
    expect(weekDays).toEqual([
      expect.any(Date),
      expect.any(Date),
      expect.any(Date),
      expect.any(Date),
      expect.any(Date),
      expect.any(Date),
      expect.any(Date),
    ]);
    expect(weekDays.map(day => adapter.formatWeekDayName(day))).toEqual(
      weekDayNameList,
    );
  });

  it('handles firstWeekDay correctly', () => {
    const now = new Date();

    weekDayNameList.forEach((name, index) => {
      expect(
        adapter
          .getWeekDays(now, { firstWeekDay: index })
          .map(day => adapter.formatWeekDayName(day)),
      ).toEqual(
        index
          ? [
              ...weekDayNameList.slice(index),
              ...weekDayNameList.slice(0, index),
            ]
          : weekDayNameList,
      );
    });
  });
});
