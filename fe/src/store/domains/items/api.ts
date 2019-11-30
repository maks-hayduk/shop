import { apiClientService } from 'services';

export const getPaginationItems = (page: number, perPage: number) =>
  apiClientService.get(`/pag/items?page=${page}&count=${perPage}`);
   
export const addItemToOrder = (itemId: number) =>
  apiClientService.post('/order/add', { data: { itemId }})

export const delItemFromOrder = (itemId: number) =>
  apiClientService.post('/order/delete', { data: { itemId }})