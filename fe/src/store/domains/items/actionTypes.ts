import { IPromiseAction } from 'types';

import { IItemsResponse, ISetMetaData, IAddItemToOrder } from './types';

export enum ItemsActionTypeKeys {
  GET_ITEMS = 'items/GET_ITEMS',
  GET_ITEMS_FULFILLED = 'items/GET_ITEMS_FULFILLED',
  GET_ITEMS_REJECTED = 'items/GET_ITEMS_REJECTED',

  SET_META_DATA = 'items/SET_META_DATA',

  ADD_ITEM_TO_ORDER = 'items/ADD_ITEM_TO_ORDER',
  ADD_ITEM_TO_ORDER_FULFILLED = 'items/ADD_ITEM_TO_ORDER_FULFILLED',
  ADD_ITEM_TO_ORDER_REJECTED = 'items/ADD_ITEM_TO_ORDER_REJECTED',

  DEL_ITEM_FROM_ORDER = 'items/DEL_ITEM_FROM_ORDER',
  DEL_ITEM_FROM_ORDER_FULFILLED = 'items/DEL_ITEM_FROM_ORDER_FULFILLED',
  DEL_ITEM_FROM_ORDER_REJECTED = 'items/DEL_ITEM_FROM_ORDER_REJECTED'
}

export interface IGetItemsActionType
  extends IPromiseAction<ItemsActionTypeKeys.GET_ITEMS, Promise<IItemsResponse>> {}

export interface IGetItemsFulfilledActionType
  extends IPromiseAction<ItemsActionTypeKeys.GET_ITEMS_FULFILLED, IItemsResponse> {}

export interface ISetMetaDataActionType
  extends IPromiseAction<ItemsActionTypeKeys.SET_META_DATA, ISetMetaData> {}

export interface IAddItemToOrderActionType
  extends IPromiseAction<ItemsActionTypeKeys.ADD_ITEM_TO_ORDER, Promise<{}>, IAddItemToOrder> {}

export interface IAddItemToOrderFulfilledActionType
  extends IPromiseAction<ItemsActionTypeKeys.ADD_ITEM_TO_ORDER_FULFILLED, {}, IAddItemToOrder> {}

export interface IDelItemFromOrderActionType
  extends IPromiseAction<ItemsActionTypeKeys.DEL_ITEM_FROM_ORDER, {}, number> {}

export interface IDelItemFromOrderFulfilledActionType
  extends IPromiseAction<ItemsActionTypeKeys.DEL_ITEM_FROM_ORDER_FULFILLED, {}, number> {}

export type IItemsctionTypes =
  | IGetItemsActionType
  | IGetItemsFulfilledActionType
  | ISetMetaDataActionType
  | IAddItemToOrderActionType
  | IAddItemToOrderFulfilledActionType
  | IDelItemFromOrderActionType
  | IDelItemFromOrderFulfilledActionType;
