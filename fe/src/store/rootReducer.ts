import { History } from 'history';

import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux-seamless-immutable';

import authReducer from './domains/auth/reducer';
import itemsReducer from './domains/items/reducer';
import ordersReducer from './domains/order/reducer';

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  auth: authReducer,
  items: itemsReducer,
  order: ordersReducer
});

export default createRootReducer;
