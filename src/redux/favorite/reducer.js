import {UPDATE_FAVORITE} from './contants';
const initialState = {
  favorites: [],
};

export const favoriteReducer = (state = initialState, action) => {
  const {payload, type} = action;
  switch (type) {
    case UPDATE_FAVORITE.ACTION: {
      const favorite = payload;
      const isExist = state.favorites.some(item => item.id === favorite.id);
      if (isExist) {
        state.favorites = state.favorites.filter(
          item => item.id !== favorite.id,
        );
      } else {
        state.favorites = [favorite, ...state.favorites];
      }
      return {...state, favorites: state.favorites};
    }
    default:
      return state;
  }
};

export default favoriteReducer;
