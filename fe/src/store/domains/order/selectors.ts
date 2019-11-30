import { IStoreState } from 'store/types';

export interface IOrderSelect {
  [key: string]: {
    id: number;
    count: number
    name: string;
    description: string;
    price: number;
  }
}

export const selectOrder = (state: IStoreState) => state.order;
