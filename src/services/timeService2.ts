const combineDateAndTime = (datePart: Date, timePart: Date): Date => {
  return new Date(
    datePart.getFullYear(),
    datePart.getMonth(),
    datePart.getDate(),
    timePart.getHours(),
    timePart.getMinutes(),
    timePart.getSeconds(),
  );
};

const getUtcDateFromLocalString = (date: string): Date => {
  return getUtcDateFromLocalDate(new Date(date));
};

const getUtcDateFromLocalDate = (date: Date): Date => {
  const currentDate = new Date();
  const offsetInMinutes = currentDate.getTimezoneOffset();
  const offsetInHours = offsetInMinutes / 60;

  date.setHours(date.getHours() + offsetInHours);

  return date;
};

const getTwoDigitsNumber = (number: number): string => {
  return number < 10 ? `0${number}` : `${number}`;
};

const dateToLocalTimeString = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const addMinutes = (date: Date, minutes: number): Date => {
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() + minutes);

  return newDate;
};

const setLocalTimeToDate = (
  date: Date,
  hours: number,
  minutes: number,
): Date => {
  const newDate = new Date(date);
  newDate.setHours(hours, minutes);

  return newDate;
};

const getLocalDayStringFromDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// const getLocalCurrentTimestamp = (): number => {
//   return Date.now();
// };

// const getLocalCurrentDayTimestamp = (): number => {
//   return timestampToDayTimestamp(Date.now());
// };

// const dateToDayTimestamp = (date: Date): number => {
//   return date.setHours(0, 0, 0, 0);
// };

// const timestampToDayTimestamp = (timestamp: number): number => {
//   return dateToDayTimestamp(new Date(timestamp));
// };

// const timestampToLocalString = (timestamp: number): string => {
//   return new Date(timestamp).toISOString();
// };

// const timestampToLocalDayString = (timestamp: number): string => {
//   return timestampToLocalString(timestamp).split('T')[0];
// };

// const getNextDayTimestamp = (timestamp: number): number => {
//   const nextDay = new Date(timestamp);
//   nextDay.setDate(new Date(timestamp).getDate() + 1);

//   return dateToDayTimestamp(nextDay);
// };

// const dateDiffInDays = (timestamp1: number, timestamp2: number) => {
//   const diffTime = Math.abs(timestamp2 - timestamp1);
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//   return diffDays + 1;
// };

// const formatDate = timestamp => {
//   const date = new Date(timestamp);
//   return date.toISOString().split('T')[0];
// };

// // TODO: refactor. need to use UTC time and reuse date instead of strings

// const convertUTCToLocalTime = (utcTime: string) => {
//   if (utcTime == null) {
//     return '';
//   }

//   const date = new Date(utcTime);
//   const options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: 'numeric',
//   };

//   return date.toLocaleString('en-US', options);
// };

// const getCurrentDayString = () => {
//   return formatDate(new Date());
// };

// const formatDate = (date: Date) => {
//   return date.toISOString().split('T')[0];
// };

// const getDate = (date: string) => {
//   return date.split('T')[0];
// };

// const getTwoDigitsNumber = (number: number) => {
//   return number < 10 ? `0${number}` : `${number}`;
// };

// const getTime = (date: string) => {
//   const newDate = new Date(date);

//   const hours = newDate.getHours();
//   const formattedHours = getTwoDigitsNumber(hours);

//   const minutes = newDate.getMinutes();
//   const formattedMinutes = getTwoDigitsNumber(minutes);

//   console.log("1 qqqqqqqq")
//   console.log(date);
//   console.log(newDate);
//   console.log(hours);
//   console.log(formattedHours);
//   console.log(minutes);
//   console.log(formattedMinutes);

//   console.log(`${formattedHours}:${formattedMinutes}`);
//   console.log("2 qqqqqqqq")

//   return `${formattedHours}:${formattedMinutes}`;
// };

// const getNextDayDateString = (date: string) => {
//   let nextDay = new Date(date);
//   nextDay.setDate(new Date(date).getDate() + 1);

//   return formatDate(nextDay);
// };

// const getNextDayDate = (date: Date) => {
//   let nextDay = new Date(date);
//   nextDay.setDate(new Date(date).getDate() + 1);

//   return nextDay;
// };

const timeService2 = {
  // getLocalCurrentTimestamp,
  // getLocalCurrentDayTimestamp,
  // dateToDayTimestamp,
  // timestampToLocalString,
  // timestampToLocalDayString,
  // getNextDayTimestamp,
  getTwoDigitsNumber,
  dateToLocalTimeString,
  combineDateAndTime,
  setLocalTimeToDate,
  getUtcDateFromLocalString,
  getUtcDateFromLocalDate,
  addMinutes,
  getLocalDayStringFromDate,
};

export default timeService2;
