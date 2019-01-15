import {
  imageSearchReq,
  retrieveFavorites,
  setupFavorites,
  syncFavorites
} from './actionRequests';

import {
  SET_CURRENT_ITEM,
  SET_CURRENT_TERM,
  SET_FAVORITES,
  SET_LIST_ITEMS,
  SET_LIST_PAGE,
  SET_SCROLLBAR_OFFSET
} from './actions';

export const setCurrentItem = payload => {
  return async dispatch => await dispatch({ payload, type: SET_CURRENT_ITEM });
};

export const setImageSearch = params => {
  return async dispatch => {
    try {
      const payload = await imageSearchReq(params);

      await dispatch({ payload: params.query, type: SET_CURRENT_TERM });
      await dispatch({ payload, type: SET_LIST_ITEMS });
    } catch(err) {
      console.log(err);
    }
  };
};

export const getFavorites = () => {
  return async dispatch => {
    try {
      const { favorites, items } = await retrieveFavorites();

      await dispatch({ payload: favorites, type: SET_FAVORITES });
      await dispatch({ payload: items, type: SET_LIST_ITEMS });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setFavorites = params => {
  return async dispatch => {
    try {
      const payload = await setupFavorites(params);

      await dispatch({ payload, type: SET_FAVORITES });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setFavoriteItem = params => {
  return async dispatch => {
    try {
      const payload = await syncFavorites(params);

      await dispatch({ payload, type: SET_FAVORITES });
    } catch(err) {
      console.log(err);
    }
  };
};

export const setListItems = payload => {
  return async dispatch => await dispatch({ payload, type: SET_LIST_ITEMS });
};

export const setListPage = payload => {
  return async dispatch => await dispatch({ payload, type: SET_LIST_PAGE });
};

export const setScrollBarOffset = payload => {
  return async dispatch => {
    return await dispatch({ payload, type: SET_SCROLLBAR_OFFSET });
  };
};
