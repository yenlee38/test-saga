import {all, fork} from 'redux-saga/effects';
import childWeatherSaga from '../weather/saga';

export default function* rootSaga() {
  yield all([fork(childWeatherSaga)]);
}
