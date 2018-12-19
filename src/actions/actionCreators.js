import {
  SET_LOADER_ACTIVE,
  SET_SCROLLBAR_OFFSET
} from './actions';

export const setLoaderActiveData = payload => {
  return { payload, type: SET_LOADER_ACTIVE };
};

export const setScrollBarOffsetData = payload => {
  return { payload, type: SET_SCROLLBAR_OFFSET };
};

// #############################################################################

export const setLoaderActive = params => {
  return async dispatch => await dispatch(setLoaderActiveData(params));
};

export const setScrollBarOffset = params => {
  return async dispatch => await dispatch(setScrollBarOffsetData(params));
};
