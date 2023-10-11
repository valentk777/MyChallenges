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

const getCurrentDateString = () => {
  return new Date().toISOString();
};

const timeService = {
  convertUTCToLocalTime,
  getCurrentDayString,
  formatDate,
  getCurrentDateString,
};

export default timeService;
