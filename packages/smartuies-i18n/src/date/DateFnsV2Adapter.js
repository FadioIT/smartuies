import { newDate } from './utils';

class DateFnsV2Adapter {
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
    const firstDay = this.getFirstWeekDay(date, { firstWeekDay });

    return this.dateFns.eachDayOfInterval(
      {
        start: firstDay,
        end: this.addDays(firstDay, 6),
      },
      {
        locale: this.locale,
      },
    );
  };

  formatDay = (date, short) =>
    this.dateFns.format(date, short ? 'd' : 'dd', this.locale);

  formatMonth = (date, short) =>
    this.dateFns.format(date, short ? 'M' : 'MM', this.locale);

  formatYear = (date, short) =>
    this.dateFns.format(date, short ? 'yy' : 'yyyy', this.locale);

  formatWeekDayName = (date, short) =>
    this.dateFns.format(date, short ? 'E' : 'EEEE', this.locale);

  formatMonthName = (date, short) =>
    this.dateFns.format(date, short ? 'MMM' : 'MMMM', this.locale);
}

export default DateFnsV2Adapter;
