import Immutable, { ImmutableObject } from 'seamless-immutable';

import { ItemsActionTypeKeys, IItemsctionTypes } from './actionTypes';
import { IItemsResponse } from './types';

const initialState: ImmutableObject<IItemsResponse> = Immutable({
  meta: {
    page: 1,
    pages: 0,
    perPage: 6,
    total: 0
  },
  items: []
});

const itemsReducer = (state = initialState, action: IItemsctionTypes) => {
  switch (action.type) {
    case ItemsActionTypeKeys.GET_ITEMS_FULFILLED: 
      return state
        .setIn(['items'], action.payload.items)
        .setIn(['meta', 'pages'], action.payload.meta.pages)
        .setIn(['meta', 'total'], action.payload.meta.total);
    
    case ItemsActionTypeKeys.UPDATE_ITEM_FULFILLED: {
      const { id } = action.meta!;
      const items = state.items.map(el => {
        if (el.id === id) {
          return action.meta;
        }
        
        return el;
      });

      return state.set('items', items);
    }

    case ItemsActionTypeKeys.SET_META_DATA:
      return state
        .setIn(['meta', 'page'], action.payload.page)
        .setIn(['meta', 'perPage'], action.payload.perPage);

    case ItemsActionTypeKeys.DELETE_ITEM_FULFILLED:
      return state
        .updateIn(['items'], val => val.filter(el => el.id !== action.meta));

    default:
      return state;
  }
};

export default itemsReducer;
