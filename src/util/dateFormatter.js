const dateFormatter = date => {
  const dateDifference = new Date().getDate() - date.getDate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];

  const formatHours = hours => (hours > 12 ? `${hours - 12}` : `${hours}`);

  const formatMinutes = minutes =>
    minutes >= 10 ? `${minutes}` : `0${minutes}`;

  if (dateDifference === 0) {
    return `Today at ${formatHours(date.getHours())}:${formatMinutes(
      date.getMinutes()
    )} ${date.getHours() < 12 ? "AM" : "PM"}`;
  }
  if (dateDifference === 1) {
    return `Yesterday at ${formatHours(date.getHours())}:${formatMinutes(
      date.getMinutes()
    )} ${date.getHours() < 12 ? "AM" : "PM"}`;
  }
  if (dateDifference > 1 && dateDifference <= 7) {
    return `Last ${daysOfWeek[date.getDay()]} at ${formatHours(
      date.getHours()
    )}:${formatMinutes(date.getMinutes())} ${
      date.getHours() < 12 ? "AM" : "PM"
    }`;
  }
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export default dateFormatter;
