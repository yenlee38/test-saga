import {
  GET_CURRENT_WEATHER,
  GET_SEARCH_WEATHER,
  GET_CURRENT_LOCAL_NAME,
} from './constants';

export const getSearchWeatherHandled = (payload, onSuccess, onFailed) => ({
  type: GET_SEARCH_WEATHER.HANDLED,
  payload,
  onSuccess,
  onFailed,
});

export const getSearchWeatherSuccess = payload => ({
  type: GET_SEARCH_WEATHER.SUCCESS,
  payload,
});

export const getSearchWeatherFailed = payload => ({
  type: GET_SEARCH_WEATHER.FAILED,
  payload,
});

export const getCurrentWeatherHandled = (payload, onSuccess, onFailed) => ({
  type: GET_CURRENT_WEATHER.HANDLED,
  payload,
  onSuccess,
  onFailed,
});

export const getCurrentWeatherSuccess = payload => ({
  type: GET_CURRENT_WEATHER.SUCCESS,
  payload,
});

export const getCurrentWeatherFailed = payload => ({
  type: GET_CURRENT_WEATHER.FAILED,
  payload,
});

export const getCurrentLocalNameHandled = payload => ({
  type: GET_CURRENT_LOCAL_NAME.HANDLED,
  payload,
});

export const getCurrentLocalNameSuccess = payload => ({
  type: GET_CURRENT_LOCAL_NAME.SUCCESS,
  payload,
});

export const getCurrentLocalNameFailed = payload => ({
  type: GET_CURRENT_LOCAL_NAME.FAILED,
  payload,
});
