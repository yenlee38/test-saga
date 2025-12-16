import {put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  getCurrentLocalNameRequest,
  getCurrentWeatherRequest,
  searchWeatherRequest,
} from '../../service/service';
import {
  getCurrentLocalNameFailed,
  getCurrentLocalNameSuccess,
  getCurrentWeatherFailed,
  getCurrentWeatherSuccess,
  getSearchWeatherFailed,
  getSearchWeatherSuccess,
} from './actions';
import {
  GET_CURRENT_LOCAL_NAME,
  GET_CURRENT_WEATHER,
  GET_SEARCH_WEATHER,
} from './constants';

export function* getCurrentWeatherSaga(action) {
  const {payload, onSuccess, onFailed} = action;
  console.log('current === api');
  try {
    const response = yield call(getCurrentWeatherRequest, {...payload});
    if (response.status === 200) {
      yield put(getCurrentWeatherSuccess(response.data));
      if (onSuccess) {
        yield call(onSuccess, response.data);
      }
    } else {
      yield put(getCurrentWeatherFailed());
      if (onFailed) {
        yield call(onFailed, response?.error);
      }
    }
  } catch (error) {
    yield put(getCurrentWeatherFailed());
    if (onFailed) {
      yield call(onFailed, response?.error);
    }
  }
}

export function* getWeatherSearchSaga(action) {
  const {payload, onSuccess, onFailed} = action;
  try {
    const response = yield call(searchWeatherRequest, {
      searchText: payload.searchText,
    });
    if (response.status === 200) {
      yield put(getSearchWeatherSuccess(response.data));
      if (onSuccess) {
        yield call(onSuccess);
      }
    } else {
      yield put(getSearchWeatherFailed());
      if (onFailed) {
        yield call(onFailed);
      }
    }
  } catch (error) {
    yield put(getSearchWeatherFailed());
    if (onFailed) {
      yield call(onFailed);
    }
  }
}

export function* getCurrentLocalNameSaga(action) {
  const {payload, onSuccess, onFailed} = action;
  try {
    const response = yield call(getCurrentLocalNameRequest, {...payload});
    if (response.status === 200) {
      yield put(getCurrentLocalNameSuccess(response.data));
      if (onSuccess) {
        yield call(onSuccess, response.data);
      }
    } else {
      yield put(getCurrentLocalNameFailed());
      if (onFailed) {
        yield call(onFailed, response?.error);
      }
    }
  } catch (error) {
    yield put(getCurrentLocalNameFailed());
    if (onFailed) {
      yield call(onFailed, response?.error);
    }
  }
}

export function* watchAsync() {
  yield takeLatest(GET_CURRENT_WEATHER.HANDLED, getCurrentWeatherSaga);
  yield takeLatest(GET_SEARCH_WEATHER.HANDLED, getWeatherSearchSaga);
  yield takeLatest(GET_CURRENT_LOCAL_NAME.HANDLED, getCurrentLocalNameSaga);
}

export default function* childWeatherSaga() {
  yield fork(watchAsync);
}
