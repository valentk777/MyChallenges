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

const timeService = {
  convertUTCToLocalTime,
};


export default timeService;
