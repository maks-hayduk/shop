import { apiClientService } from 'services';

import { parseOrderResponse } from './utils';

export const getOrder = () => apiClientService.get('/order').then(parseOrderResponse);
   