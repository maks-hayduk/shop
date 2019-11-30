import { getUserData, getOrderAction, handleChangePageAction } from 'store';
import { IThunk } from 'types';
import { apiClientService } from 'services';

type IInit = () => IThunk<void>;

export const handleInitAction: IInit = () => (dispatch, getState) => {
  const token = window.localStorage.getItem('AUTH_TOKEN');
  if (token) {
    apiClientService.setDefaultHeaders('Authorization', `${token}`);
    dispatch(getUserData());
    dispatch(getOrderAction());
  }
}