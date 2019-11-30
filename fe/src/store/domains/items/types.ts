import { ImmutableObject } from 'seamless-immutable';

export interface IItem {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IItemsResponse {
  meta: {
    page: number;
    pages: number;
    perPage: number;
    total: number;
  },
  items: IItem[];
}

export interface ISetMetaData {
  page: number;
  perPage: number;
}

export interface IAddItemToOrder {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
}

export interface IItemsState extends ImmutableObject<IItemsResponse> {}
