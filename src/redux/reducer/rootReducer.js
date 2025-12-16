import weatherReducer from '../weather/reducer';
import favoriteReducer from '../favorite/reducer';
import historyReducer from '../history/reducer';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
  weather: weatherReducer,
  favorite: favoriteReducer,
  history: historyReducer,
});
