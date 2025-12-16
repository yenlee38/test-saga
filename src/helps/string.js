export const urlIcon = id => {
  return `https://openweathermap.org/img/wn/${id}.png`;
};

export const getTemp = tempK => {
  if (tempK >= 273.15) return tempK - 273.15;
  return tempK;
};
