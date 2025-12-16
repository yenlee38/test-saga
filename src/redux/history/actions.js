import {REMOVE_HISTORY_ACTION, UPDATE_HISTORY_ACTION} from './constants';

export const updateHistoryRecentSearchHandled = payload => ({
  type: UPDATE_HISTORY_ACTION.HANDLED,
  payload,
});

export const removeHistoryRecentSearchHandled = payload => ({
  type: REMOVE_HISTORY_ACTION.HANDLED,
  payload,
});
