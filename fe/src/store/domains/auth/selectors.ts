import { IStoreState } from 'store/types';

export const selectAuthToken = (state: IStoreState) => state.auth.token;
export const selectAuthSuccess = (state: IStoreState) => state.auth.success;
export const selectUserName = (state: IStoreState) => state.auth.name;
export const selectUserRole = (state: IStoreState) => state.auth.role;
