import { newDate } from './utils';

class MomentAdapter {
  constructor({ moment, locale, firstWeekDay }) {
    this.moment = moment;
    this.locale = locale;
    this.firstWeekDay = firstWeekDay || 0;
  }

  addDays = (date, amount) => new Date(this.moment(date).add(amount, 'days'));

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

  formatDay = (date, short) => this.moment(date).format(short ? 'D' : 'DD');

  formatMonth = (date, short) => this.moment(date).format(short ? 'M' : 'MM');

  formatYear = (date, short) => this.moment(date).format(short ? 'YY' : 'YYYY');

  formatMonthName = (date, short) =>
    this.moment(date).format(short ? 'MMM' : 'MMMM');

  formatWeekDayName = (date, short) =>
    this.moment(date).format(short ? 'ddd' : 'dddd');
}

export default MomentAdapter;
