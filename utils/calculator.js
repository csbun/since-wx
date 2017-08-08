const moment = require('../lib/moment');

export function toMidnightTimeStamp(date) {
  return moment(date).startOf('day').valueOf();
}

export function daysBetween(dTo, dFrom = new Date()) {
  // return (toMidnightTimeStamp(dFrom) - toMidnightTimeStamp(dTo)) / A_DAY_MS;
  return Math.floor(moment.duration(toDate(dFrom) - toDate(dTo)).asDays());
}

export function daysSinceByItem(item) {
  return daysBetween(item.date, item.stopTracking ? item.endDate : undefined);
}

// export function daysFromNow(dTo) {
//   return daysBetween(dTo, Date.now());
// }

const FORMAT_STRING = 'YYYY-MM-DD';

export function formatDate(date) {
  return moment(date).format(FORMAT_STRING);
}

export function toDate(str) {
  return moment(str);
}