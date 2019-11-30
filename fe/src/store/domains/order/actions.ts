import { push } from 'connected-react-router';

import { IThunk } from 'types';

import {
  IGetOrderActionType, OrderActionTypeKeys
} from './actionTypes';
import * as api from './api';

export type GetOrderAction = () => IGetOrderActionType;

export const getOrderAction: GetOrderAction = () => ({
  type: OrderActionTypeKeys.GET_ORDER,
  payload: api.getOrder()
});
