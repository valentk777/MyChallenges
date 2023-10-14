// TODO: refactor. need to use UTC time and reuse date instead of strings

const convertUTCToLocalTime = (utcTime: string) => {
  if (utcTime == null) {
    return '';
  }

  const date = new Date(utcTime);
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  return date.toLocaleString('en-US', options);
};

const getCurrentDayString = () => {
  return formatDate(new Date());
};

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0];
};

const getDate = (date: string) => {
  return date.split('T')[0];
};

const getTime = (date: string) => {
  const newDate = new Date(date);
  
  const hours = newDate.getUTCHours();
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;

  const minutes = newDate.getUTCMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};

const getCurrentDateString = () => {
  return new Date().toISOString();
};

const dateDiffInDays = (date1: Date, date2: Date) => {
  const diffTime = Math.abs(date2 - date1);

  if (isNaN(diffTime)) {
    return 0;
  }

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
};

const getNextDayDate = (date: string) => {
  let nextDay = new Date(date);
  nextDay.setDate(new Date(date).getDate() + 1);

  return formatDate(nextDay);
}

const timeService = {
  convertUTCToLocalTime,
  getCurrentDayString,
  formatDate,
  getCurrentDateString,
  dateDiffInDays,
  getDate,
  getTime,
  getNextDayDate,
};

export default timeService;
