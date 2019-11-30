import { IStoreState } from 'store/types';

export const selectItems = (state: IStoreState) => state.items.items.asMutable();

export interface IMetaDataSelect {
  page: number;
  pages: number;
  perPage: number;
  total: number;
}

export const selectMetaData = (state: IStoreState): IMetaDataSelect => state.items.meta.asMutable();