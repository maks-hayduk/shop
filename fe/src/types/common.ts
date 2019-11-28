import { AnyAction, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { IStoreState } from 'store';

export type IThunk<R> = ThunkAction<R, IStoreState, {}, AnyAction>;
export type TDispatch = Dispatch<AnyAction> & ThunkDispatch<IStoreState, {}, AnyAction>;

export interface IPromiseAction<T = string, P = object, M = object> {
  readonly type: T;
  readonly payload: P;
  readonly meta?: M;
}
