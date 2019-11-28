import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createRootReducer from './rootReducer';

import createMiddleware from './middleware';
// import {reducer as notifications} from 'react-notification-system-redux';

export const history = createBrowserHistory();

const middleware = createMiddleware(history);
const rootReducer = createRootReducer(history);

const composeEnhancers = (
  process.env.NODE_ENV === 'development' &&
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;

export * from './domains';
export * from './types';