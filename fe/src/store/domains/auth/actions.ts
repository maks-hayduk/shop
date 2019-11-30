import { push } from 'connected-react-router';

import { apiClientService } from 'services';
import { IThunk } from 'types';

import {
  AuthActionTypeKeys,
  ISignupActionType,
  ILoginActionType,
  IGetUserDataActionType,
  ILogOutActionType
} from './actionTypes';
import * as api from './api';
import { selectAuthToken, selectAuthSuccess } from './selectors';

export const setToken = (val: string) => {
  window.localStorage.setItem('AUTH_TOKEN', val);
  apiClientService.setDefaultHeaders('Authorization', `${val}`);
};

export type SignupAction = (name: string, email: string, password: string) => ISignupActionType;
export type LoginAction = (email: string, password: string) => ILoginActionType;
export type HandleSignupAction = (name: string, email: string, password: string) => IThunk<void>;
export type HandleLoginAction = (email: string, password: string) => IThunk<void>;
export type GetUserData = () => IGetUserDataActionType;
export type HandleInitAction = () => IThunk<void>;
export type LogOutAction = () => ILogOutActionType;
export type HandleLogOutAction = () => IThunk<void>;

export const signupAction: SignupAction = (name, email, password) => ({
  type: AuthActionTypeKeys.SIGNUP,
  payload: api.signup(name, email, password)
})

export const loginAction: LoginAction = (email, password) => ({
  type: AuthActionTypeKeys.LOGIN,
  payload: api.login(email, password)
})

export const getUserData: GetUserData = () => ({
  type: AuthActionTypeKeys.GET_USER_DATA,
  payload: api.getUserData()
})

export const logOutAction: LogOutAction = () => ({
  type: AuthActionTypeKeys.LOG_OUT,
  payload: {}
});

export const handleLogOutAction: HandleLogOutAction = () => (dispatch) => {
  dispatch(logOutAction());
  window.localStorage.removeItem('AUTH_TOKEN');
}

export const handleSignupAction: HandleSignupAction = (
  name, 
  email, 
  password
) => async (dispatch, getState) => {
  await dispatch(signupAction(name, email, password));
  const state = getState();

  if (selectAuthSuccess(state)) {
    dispatch(push('/login'))
  }
}

export const handleLoginAction: HandleLoginAction = (
  email, 
  password
) => async (dispatch, getState) => {
  await dispatch(loginAction(email, password));
  const state = getState();
  const token = selectAuthToken(state)

  if (selectAuthSuccess(state) && token) {
    setToken(token);
    dispatch(getUserData());
    dispatch(push('/'));
  }
}
