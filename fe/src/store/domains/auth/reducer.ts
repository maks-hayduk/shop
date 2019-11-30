import Immutable, { ImmutableObject } from 'seamless-immutable';

import { AuthActionTypeKeys, IAuthActionTypes } from './actionTypes';
import { IAuthInitialState } from './types';

const initialState: ImmutableObject<IAuthInitialState> = Immutable({
  token: '',
  success: false,
  id: 0,
  name: '',
  email: ''
});

const authReducer = (state = initialState, action: IAuthActionTypes) => {
  switch (action.type) {
    case AuthActionTypeKeys.LOGIN_FULFILLED:
      return state.merge(action.payload);

    case AuthActionTypeKeys.SIGNUP_FULFILLED:
      return state.setIn(['success'], action.payload.success);

    case AuthActionTypeKeys.GET_USER_DATA_FULFILLED:
      return state.merge(action.payload).setIn(['success'], true);

    case AuthActionTypeKeys.LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default authReducer;
