import {
  SET_LIST_ITEMS,
  SET_LIST_PAGE,
  SET_LOADER_ACTIVE,
  SET_SCROLLBAR_OFFSET
} from './actions';

export const setListPageData = payload => {
  return { payload, type: SET_LIST_PAGE };
};

export const setLoaderActiveData = payload => {
  return { payload, type: SET_LOADER_ACTIVE };
};

export const setScrollBarOffsetData = payload => {
  return { payload, type: SET_SCROLLBAR_OFFSET };
};

// #############################################################################

export const setListPage = params => {
  return async dispatch => await dispatch(setListPageData(params));
};

export const setLoaderActive = params => {
  return async dispatch => await dispatch(setLoaderActiveData(params));
};

export const setScrollBarOffset = params => {
  return async dispatch => await dispatch(setScrollBarOffsetData(params));
};
