const numberFormatter = number => {
  if (number >= 1000 && number < 1000000) {
    const base = Math.floor(number / 1000);
    const fraction = Math.floor((number / 1000 - base) * 10);
    return `${base}${fraction !== 0 ? `.${fraction}` : ""}K`;
  }
  if (number >= 1000000 && number < 1000000000) {
    const base = Math.floor(number / 1000000);
    const fraction = Math.floor((number / 1000000 - base) * 10);
    return `${base}${fraction !== 0 ? `.${fraction}` : ""}M`;
  }
  if (number >= 1000000 && number < 1000000000000) {
    const base = Math.floor(number / 1000000);
    const fraction = Math.floor((number / 1000000 - base) * 10);
    return `${base}${fraction !== 0 ? `.${fraction}` : ""}B`;
  }
  return `${number}`;
};

export default numberFormatter;
