import { combineReducers } from 'redux';
import { getBasicReducer, uniqGenerator } from '../utils/helperUtils';
import { SET_FAVORITES } from '../actions/actions';

const favorites = (state = {}, act) => {
  return getBasicReducer({ act, name: SET_FAVORITES, state });
};

const rootReducer = combineReducers({
  favorites
});

export default rootReducer;
