import { newDate } from './utils';

class DateFnsV1Adapter {
  constructor({ dateFns, locale, firstWeekDay }) {
    this.locale = locale;
    this.dateFns = dateFns;
    this.firstWeekDay = firstWeekDay || 0;
  }

  addDays = (date, amount) => this.dateFns.addDays(newDate(date), amount);

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
    this.dateFns.format(newDate(date), short ? 'D' : 'DD', this.locale);

  formatMonth = (date, short) =>
    this.dateFns.format(newDate(date), short ? 'M' : 'MM', this.locale);

  formatYear = (date, short) =>
    this.dateFns.format(newDate(date), short ? 'YY' : 'YYYY', this.locale);

  formatMonthName = (date, short) =>
    this.dateFns.format(newDate(date), short ? 'MMM' : 'MMMM', this.locale);

  formatWeekDayName = (date, short) =>
    this.dateFns.format(newDate(date), short ? 'ddd' : 'dddd', this.locale);
}

export default DateFnsV1Adapter;
