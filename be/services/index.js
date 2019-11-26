import pool from './dbPoolService';

import AuthService from './authService';
import ItemsService from './itemsService';
import OrderService from './orderService';

const authService = new AuthService();
const itemsService = new ItemsService();
const orderService = new OrderService();

export { pool, authService, itemsService, orderService };
