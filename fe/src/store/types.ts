import { ConnectedRouter } from 'connected-react-router';

import {
  IAuthState,
  IItemsState,
  IOrderState
} from './domains';

export interface IStoreState {
  router: ConnectedRouter;
  auth: IAuthState;
  items: IItemsState;
  order: IOrderState;
}
