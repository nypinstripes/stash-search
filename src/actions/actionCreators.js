import { imageSearchReq } from './actionRequests';
import {
  SET_CURRENT_ITEM,
  SET_CURRENT_TERM,
  SET_LIST_ITEMS,
  SET_LIST_PAGE,
  SET_LOADER_ACTIVE,
  SET_SCROLLBAR_OFFSET
} from './actions';

export const setCurrentItemData = payload => {
  return { payload, type: SET_CURRENT_ITEM };
};

export const setCurrentTermData = payload => {
  return { payload, type: SET_CURRENT_TERM };
};

export const setListItemsData = payload => {
  return { payload, type: SET_LIST_ITEMS };
};

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

export const setListItems = params => {
  return async dispatch => await dispatch(setListItemsData(params));
};

export const setListPage = params => {
  return async dispatch => await dispatch(setListPageData(params));
};

export const setLoaderActive = params => {
  return async dispatch => await dispatch(setLoaderActiveData(params));
};

export const setScrollBarOffset = params => {
  return async dispatch => await dispatch(setScrollBarOffsetData(params));
};
