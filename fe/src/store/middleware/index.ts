import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { MiddlewareAPI } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reduxThunk from 'redux-thunk';

import { IPromiseAction, TDispatch } from 'types';

// TODO: Describe interface for PromiseError and fix any
const authMiddleware: any = <StoreState>({ dispatch }: MiddlewareAPI<TDispatch, StoreState>) => (next: TDispatch) => (
  action: IPromiseAction<string, { status?: number }>
) => {
  return next(action);
};

const createMiddleware = (history: History) => {
  return [reduxThunk, reduxPromiseMiddleware, routerMiddleware(history), authMiddleware];
};

export default createMiddleware;
