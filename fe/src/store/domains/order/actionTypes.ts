import { IPromiseAction } from 'types';

export enum OrderActionTypeKeys {
  GET_ORDER = 'order/GET_ORDER',
  GET_ORDER_FULFILLED = 'order/GET_ORDER_FULFILLED',
  GET_ORDER_REJECTED = 'order/GET_ORDER_REJECTED'
}

export interface IGetOrderActionType
  extends IPromiseAction<OrderActionTypeKeys.GET_ORDER, Promise<{}>> {}

export interface IGetOrderFulfilledActioType
  extends IPromiseAction<OrderActionTypeKeys.GET_ORDER_FULFILLED, {}> {}

export type IOrderActionTypes =
  | IGetOrderActionType
  | IGetOrderFulfilledActioType;
