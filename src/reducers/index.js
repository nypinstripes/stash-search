import { combineReducers } from 'redux';
import { getBasicReducer } from '../utils';
import {
  SET_CURRENT_ITEM,
  SET_CURRENT_TERM,
  SET_FAVORITES,
  SET_LIST_ITEMS,
  SET_LIST_PAGE,
  SET_SCROLLBAR_OFFSET
} from '../actions/actions';

const currentItem = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_CURRENT_ITEM, state });
};

const currentTerm = (state = '', action) => {
  return getBasicReducer({ action, name: SET_CURRENT_TERM, state });
};

const favorites = (state = {}, action) => {
  return getBasicReducer({ action, name: SET_FAVORITES, state });
};

const listItems = (state = [], action) => {
  return getBasicReducer({ action, name: SET_LIST_ITEMS, state });
};

const listPage = (state = 1, action) => {
  return getBasicReducer({ action, name: SET_LIST_PAGE, state });
};

const scrollOffset = (state = 0, action) => {
  return getBasicReducer({ action, name: SET_SCROLLBAR_OFFSET, state });
};

const rootReducer = combineReducers({
  currentItem,
  currentTerm,
  favorites,
  listItems,
  listPage,
  scrollOffset
});

export default rootReducer;
