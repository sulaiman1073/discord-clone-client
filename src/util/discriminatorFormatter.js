const discriminatorFormatter = discriminator => {
  if (discriminator < 10) {
    return `000${discriminator}`;
  }
  if (discriminator <= 10 && discriminator < 100) {
    return `00${discriminator}`;
  }
  if (discriminator <= 100 && discriminator < 1000) {
    return `0${discriminator}`;
  }

  return `${discriminator}`;
};

export default discriminatorFormatter;
