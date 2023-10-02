const convertUTCToLocalTime = (utcTime: string) => {
  if (utcTime == null) {
    return "";
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

const getCurrentDate = () => {
  return formatDate(new Date())
}

const formatDate = (date: Date) => {
  return date.toISOString().split('T')[0]
}

const timeService = {
  convertUTCToLocalTime,
  getCurrentDate,
  formatDate,
};

export default timeService;
