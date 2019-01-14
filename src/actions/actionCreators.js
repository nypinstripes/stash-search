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

export const setCurrentItemData = payload => {
  return { payload, type: SET_CURRENT_ITEM };
};

export const setCurrentTermData = payload => {
  return { payload, type: SET_CURRENT_TERM };
};

export const setFavoritesData = payload => {
  return { payload, type: SET_FAVORITES };
};

export const setListItemsData = payload => {
  return { payload, type: SET_LIST_ITEMS };
};

export const setListPageData = payload => {
  return { payload, type: SET_LIST_PAGE };
};

export const setScrollBarOffsetData = payload => {
  return { payload, type: SET_SCROLLBAR_OFFSET };
};

// Creators

export const setCurrentItem = params => {
  return async dispatch => await dispatch(setCurrentItemData(params));
};

export const setImageSearch = params => {
  return async dispatch => {
    try {
      const data = await imageSearchReq(params);

      await dispatch(setCurrentTermData(params.query));
      await dispatch(setListItemsData(data));
    } catch(err) {
      console.log(err);
    }
  };
};

export const getFavorites = () => {
  return async dispatch => {
    try {
      const { favorites, items } = await retrieveFavorites();

      await dispatch(setFavoritesData(favorites));
      await dispatch(setListItemsData(items));
    } catch(err) {
      console.log(err);
    }
  };
};

export const setFavorites = params => {
  return async dispatch => {
    try {
      const data = await setupFavorites(params);

      await dispatch(setFavoritesData(params));
    } catch(err) {
      console.log(err);
    }
  };
};

export const setFavoriteItem = params => {
  return async dispatch => {
    try {
      const data = await syncFavorites(params);

      await dispatch(setFavoritesData(params));
    } catch(err) {
      console.log(err);
    }
  };
};

export const setListItems = params => {
  return async dispatch => await dispatch(setListItemsData(params));
};

export const setListPage = params => {
  return async dispatch => await dispatch(setListPageData(params));
};

export const setScrollBarOffset = params => {
  return async dispatch => await dispatch(setScrollBarOffsetData(params));
};
