const dateFormatter2 = date => {
  const newDate = new Date(date);
  let dayOfWeek = newDate.getDay();
  let dayOfMonth = newDate.getDate();
  let month = newDate.getMonth();
  const year = newDate.getFullYear();
  let hour = newDate.getHours();
  let minute = newDate.getMinutes();
  if (minute < 10) minute = `0${minute}`;
  let amPm;

  if (hour === 0) {
    hour = 12;
    amPm = "AM";
  } else if (hour > 12) {
    hour = hour - 12;
    amPm = "PM";
  } else {
    amPm = "AM";
  }

  if (dayOfWeek === 0) dayOfWeek = "Sunday";
  else if (dayOfWeek === 1) dayOfWeek = "Monday";
  else if (dayOfWeek === 2) dayOfWeek = "Tuesday";
  else if (dayOfWeek === 3) dayOfWeek = "Wednesday";
  else if (dayOfWeek === 4) dayOfWeek = "Thursday";
  else if (dayOfWeek === 5) dayOfWeek = "Friday";
  else if (dayOfWeek === 6) dayOfWeek = "Saturday";

  if (month === 0) month = "January";
  else if (month === 1) month = "February";
  else if (month === 2) month = "March";
  else if (month === 3) month = "April";
  else if (month === 4) month = "May";
  else if (month === 5) month = "June";
  else if (month === 6) month = "July";
  else if (month === 7) month = "August";
  else if (month === 8) month = "September";
  else if (month === 9) month = "October";
  else if (month === 10) month = "November";
  else if (month === 11) month = "December";

  return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} ${hour}:${minute} ${amPm}`;
};

export default dateFormatter2;
