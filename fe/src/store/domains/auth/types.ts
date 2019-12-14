import { ImmutableObject } from 'seamless-immutable';

export interface ISignupResponse {
  success: boolean;
}

export interface ILoginResponse {
  token: string;
  success: boolean;
  id: number;
  name: string;
  role: string;
}

export interface IUserDataResponse {
  id: number;
  name: string;
  email: string;
}

export interface IAuthInitialState {
  token: string;
  success: boolean;
  id: number;
  name: string;
  email: string;
  role: string;
}


export interface IAuthState extends ImmutableObject<IAuthInitialState> {}
