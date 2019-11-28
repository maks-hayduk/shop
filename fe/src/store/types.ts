import { ConnectedRouter } from 'connected-react-router';

import {
  IAuthState
} from './domains';

export interface IStoreState {
  router: ConnectedRouter;
  auth: IAuthState
}
