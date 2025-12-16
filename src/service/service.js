import APIClient from './request';

export const getCurrentWeatherRequest = async ({lat, lon}) => {
  return await APIClient.get({
    url: '/data/2.5/weather',
    params: {
      lat,
      lon,
      units: 'metric',
    },
  });
};

export const searchWeatherRequest = async ({searchText}) => {
  return await APIClient.get({
    url: '/data/2.5/weather',
    params: {
      q: searchText,
      units: 'metric',
    },
  });
};

export const getCurrentLocalNameRequest = async ({lat, lon}) => {
  return await APIClient.get({
    url: '/geo/1.0/reverse',
    params: {
      lat,
      lon,
    },
  });
};
