import {REMOVE_HISTORY_ACTION, UPDATE_HISTORY_ACTION} from './constants';

const initialState = {
  historySearch: [],
};

export const historyReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case UPDATE_HISTORY_ACTION.HANDLED: {
      const item = payload;
      let history = [...state.historySearch];
      if (!history.includes(item)) {
        history = [item, ...history];
      }
      return {...state, historySearch: history};
    }
    case REMOVE_HISTORY_ACTION.HANDLED: {
      const item = action.payload;
      state.historySearch = state.historySearch.filter(
        element => element !== item,
      );
      return {...state};
    }
    default:
      return state;
  }
};

export default historyReducer;
