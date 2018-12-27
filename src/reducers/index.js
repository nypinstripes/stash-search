import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils/helperUtils';
import {
  SET_FAVORITES,
  SET_LIST_ITEMS,
  SET_LIST_PAGE,
  SET_LOADER_ACTIVE,
  SET_SCROLLBAR_OFFSET
} from '../actions/actions';

const favorites = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_FAVORITES, state });
};

const listItems = (state = {}, action) => {
  return action.type === SET_LIST_ITEMS ? action : state;
};

const listPage = (state = 1, action) => {
  return getBasicReducer({ action, name: SET_LIST_PAGE, state });
};

const loaderActive = (state = false, action) => {
  return getBasicReducer({ action, name: SET_LOADER_ACTIVE, state });
};

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const rootReducer = combineReducers({
  favorites,
  listItems,
  listPage,
  loaderActive,
  scrollOffset
});

export default rootReducer;
