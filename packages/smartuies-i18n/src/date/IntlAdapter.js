import { newDate } from './utils';

class IntlAdapter {
  constructor({ locale, firstWeekDay } = {}) {
    [this.locale] = Intl.getCanonicalLocales(locale);
    this.firstWeekDay = firstWeekDay || 0;
  }

  addDays = (date, amount) => {
    date = newDate(date);
    date.setDate(date.getDate() + amount);

    return date;
  };

  getFirstMonthDay = date => {
    date = newDate(date);
    date.setDate(1);
    return date;
  };

  getFirstWeekDay = (date, { firstWeekDay = this.firstWeekDay } = {}) => {
    date = newDate(date);
    const day = date.getDay();

    if (firstWeekDay !== day) {
      return this.addDays(date, firstWeekDay - day);
    }

    return date;
  };

  getWeekDays = (date, { firstWeekDay = this.firstWeekDay } = {}) => {
    const weekDays = [this.getFirstWeekDay(date, { firstWeekDay })];

    for (let i = 1; i < 7; i++) {
      weekDays.push(this.addDays(weekDays[0], i));
    }

    return weekDays;
  };

  formatDay = (date, short) =>
    new Intl.DateTimeFormat(this.locale, {
      day: short ? 'numeric' : '2-digit',
    }).format(newDate(date));

  formatMonth = (date, short) =>
    new Intl.DateTimeFormat(this.locale, {
      month: short ? 'numeric' : '2-digit',
    }).format(newDate(date));

  formatYear = (date, short) =>
    new Intl.DateTimeFormat(this.locale, {
      year: short ? '2-digit' : 'numeric',
    }).format(newDate(date));

  formatWeekDayName = (date, short) =>
    new Intl.DateTimeFormat(this.locale, {
      weekday: short ? 'short' : 'long',
    }).format(newDate(date));

  formatMonthName = (date, short) =>
    new Intl.DateTimeFormat(this.locale, {
      month: short ? 'short' : 'long',
    }).format(newDate(date));
}

export default IntlAdapter;
