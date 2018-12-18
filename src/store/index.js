import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

const hasDevToolsExtension = typeof window.devToolsExtension !== 'undefined';
const isWindowObject = typeof window === 'object';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    isWindowObject && hasDevToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
