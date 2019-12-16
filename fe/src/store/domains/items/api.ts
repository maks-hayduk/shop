import { apiClientService } from 'services';
import { IItemModel } from './types';

export const getPaginationItems = (page: number, perPage: number) =>
  apiClientService.get(`/pag/items?page=${page}&count=${perPage}`);
   
export const addItemToOrder = (itemId: number) =>
  apiClientService.post('/order/add', { data: { itemId }});

export const delItemFromOrder = (itemId: number) =>
  apiClientService.post('/order/delete', { data: { itemId }});

export const addItem = (data: IItemModel) => apiClientService.post('/items/add', { data });

export const deleteItem = (itemId: number) => apiClientService.post(`/items/del?itemid=${itemId}`);

export const updateItem = (itemId: number, data: IItemModel) => apiClientService.put(`/items/update?id=${itemId}`, { data });
