import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils/helperUtils';
import {
  SET_FAVORITES,
  SET_LOADER_ACTIVE,
  SET_SCROLLBAR_OFFSET
} from '../actions/actions';

const favorites = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_FAVORITES, state });
};

const loaderActive = (state = false, action) => {
  return getBasicReducer({ action, name: SET_LOADER_ACTIVE, state });
};

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const rootReducer = combineReducers({
  favorites,
  loaderActive,
  scrollOffset
});

export default rootReducer;
