import { IPromiseAction } from 'types';

import { ISignupResponse, ILoginResponse, IUserDataResponse } from './types';

export enum AuthActionTypeKeys {
  SIGNUP = 'auth/SIGNUP',
  SIGNUP_FULFILLED = 'auth/SIGNUP_FULFILLED',
  SIGNUP_REJECTED = 'auth/SIGNUP_REJECTED',

  LOGIN = 'auth/LOGIN',
  LOGIN_FULFILLED = 'auth/LOGIN_FULFILLED',
  LOGIN_REJECTED = 'auth/LOGIN_REJECTED',

  GET_USER_DATA = 'auth/GET_USER_DATA',
  GET_USER_DATA_FULFILLED = 'auth/GET_USER_DATA_FULFILLED',
  GET_USER_DATA_REJECTED = 'auth/GET_USER_DATA_REJECTED',

  LOG_OUT = 'auth/LOG_OUT'
}

export interface ISignupActionType
  extends IPromiseAction<AuthActionTypeKeys.SIGNUP, Promise<ISignupResponse>> {}

export interface ISignupFulfilledActionType
  extends IPromiseAction<AuthActionTypeKeys.SIGNUP_FULFILLED, ISignupResponse> {}

export interface ILoginActionType
  extends IPromiseAction<AuthActionTypeKeys.LOGIN, Promise<ILoginResponse>> {}

export interface ILoginFulfilledActionType
  extends IPromiseAction<AuthActionTypeKeys.LOGIN_FULFILLED, ILoginResponse> {}

export interface IGetUserDataActionType
  extends IPromiseAction<AuthActionTypeKeys.GET_USER_DATA, Promise<IUserDataResponse>> {}

export interface IGetUserDataFulfilledActionType
  extends IPromiseAction<AuthActionTypeKeys.GET_USER_DATA_FULFILLED, IUserDataResponse> {}

export interface ILogOutActionType
  extends IPromiseAction<AuthActionTypeKeys.LOG_OUT, {}> {}

export type IAuthActionTypes =
  | ISignupActionType
  | ISignupFulfilledActionType
  | ILoginActionType
  | ILoginFulfilledActionType
  | IGetUserDataActionType
  | IGetUserDataFulfilledActionType
  | ILogOutActionType;
