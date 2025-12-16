import {
  GET_CURRENT_WEATHER,
  GET_SEARCH_WEATHER,
  GET_CURRENT_LOCAL_NAME,
} from './constants';

const initialState = {
  weathers: [],
  currentWeather: {},
  currentName: '',
};

const weatherReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case GET_CURRENT_WEATHER.SUCCESS: {
      return {...state, currentWeather: payload};
    }
    case GET_SEARCH_WEATHER.SUCCESS: {
      return {...state, weathers: [payload]};
    }
    case GET_SEARCH_WEATHER.FAILED: {
      return {...state, weathers: []};
    }
    case GET_CURRENT_LOCAL_NAME.SUCCESS: {
      return {...state, currentName: payload[0].local_names.vi};
    }
    default:
      return state;
  }
};

export default weatherReducer;
