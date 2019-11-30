import Immutable, { ImmutableObject } from 'seamless-immutable';

import { ItemsActionTypeKeys, IItemsctionTypes } from 'store';

import { OrderActionTypeKeys, IOrderActionTypes } from './actionTypes';
import { IOrderInitialState } from './types';

const initialState: ImmutableObject<IOrderInitialState> = Immutable({});

const ordersReducer = (state = initialState, action: IOrderActionTypes | IItemsctionTypes) => {
  switch (action.type) {
    case OrderActionTypeKeys.GET_ORDER_FULFILLED: 
      return state.merge(action.payload);

    case ItemsActionTypeKeys.ADD_ITEM_TO_ORDER_FULFILLED: {
      const { id, stock, ...data } = action.meta as any;

      if (!state[id]) {
        return state.setIn([`${id}`], {...data, id, count: 1});
      }
      return state.updateIn([`${id}`], (el) => ({...el, id, count: el.count + 1}));
    }

    case ItemsActionTypeKeys.DEL_ITEM_FROM_ORDER_FULFILLED: {
      const id = action.meta as number;

      if (state[id] && state[id].count === 1) {
        return state.updateIn([`${id}`], (el) => ({...el, count: 0}));
      }
      return state.updateIn([`${id}`], (el) => {
        return ({...el, count: +el.count - 1})
      });
    }

    default:
      return state;
  }
};

export default ordersReducer;
