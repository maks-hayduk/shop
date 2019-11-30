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

    case ItemsActionTypeKeys.SET_META_DATA:
      return state
        .setIn(['meta', 'page'], action.payload.page)
        .setIn(['meta', 'perPage'], action.payload.perPage);

    default:
      return state;
  }
};

export default itemsReducer;