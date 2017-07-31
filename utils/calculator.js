const moment = require('../lib/moment');

export function toMidnightTimeStamp(date) {
  return moment(date).startOf('day').valueOf();
}

export function daysBetween(dTo, dFrom = new Date()) {
  // return (toMidnightTimeStamp(dFrom) - toMidnightTimeStamp(dTo)) / A_DAY_MS;
  return Math.floor(moment.duration(dFrom - dTo).asDays());
}

export function daysSinceByItem(item) {
  return daysBetween(item.date, item.stopTracking ? item.endDate : undefined);
}

// export function daysFromNow(dTo) {
//   return daysBetween(dTo, Date.now());
// }

export function formatDate(date) {
  return moment(date).format('YYYY-MM-DD');
}
