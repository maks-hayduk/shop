import { push } from 'connected-react-router';

import { IThunk } from 'types';

import {
  ItemsActionTypeKeys,
  IGetItemsActionType,
  ISetMetaDataActionType,
  IAddItemToOrderActionType,
  IDelItemFromOrderActionType,
  IAddItemActionType,
  IDeleteItemActionType
} from './actionTypes';
import * as api from './api';
import { selectMetaData } from './selectors';
import { IAddItem } from './types';

export type GetItems = (page: number, perPage: number) => IGetItemsActionType;
export type SetMetaData = (page: number, perPage: number) => ISetMetaDataActionType;
export type HandleChangePageAction = (page: number) => IThunk<void>;
export type AddItemToOrderAction = (itemId: number, el: any) => IAddItemToOrderActionType;
export type DeleteItemFromOrderAction = (itemId: number) => IDelItemFromOrderActionType;
export type AddItemAction = (data: IAddItem) => IAddItemActionType;
export type DeleteItemAction = (itemId: number) => IDeleteItemActionType;

export const deleteItemAction: DeleteItemAction = (itemId) => ({
  type: ItemsActionTypeKeys.DELETE_ITEM,
  payload: api.deleteItem(itemId),
  meta: itemId
})

export const addItemAction: AddItemAction = (data) => ({
  type: ItemsActionTypeKeys.ADD_ITEM,
  payload: api.addItem(data),
  meta: data
});

export const getItemsAction: GetItems = (page, perPage) => ({
  type: ItemsActionTypeKeys.GET_ITEMS,
  payload: api.getPaginationItems(page, perPage)
});

export const setMetaDataAction: SetMetaData = (page, perPage) => ({
  type: ItemsActionTypeKeys.SET_META_DATA,
  payload: {
    page,
    perPage
  }
})

export const addItemToOrderAction: AddItemToOrderAction = (itemId, el) => ({
  type: ItemsActionTypeKeys.ADD_ITEM_TO_ORDER,
  payload: api.addItemToOrder(itemId),
  meta: el
})

export const delItemFromOrderAction: DeleteItemFromOrderAction = (itemId) => ({
  type: ItemsActionTypeKeys.DEL_ITEM_FROM_ORDER,
  payload: api.delItemFromOrder(itemId),
  meta: itemId
})

export const handleChangePageAction: HandleChangePageAction = (page) => async (dispatch, getState) => {
  let state = getState();
  await dispatch(setMetaDataAction(page, selectMetaData(state).perPage));
  state = getState();
  const metaData = selectMetaData(state);

  dispatch(getItemsAction(metaData.page, metaData.perPage));
}