export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const normalizeDay = increm => (new Date().getDay() + increm) % 7;

export const unixToTime = unixTime => {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;
  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
};

export const unixToDateTime = unixTime => {
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;
  return `${month}-${day}-${year} ${hours}:${minutes.substr(
    -2
  )}:${seconds.substr(-2)}`;
};
