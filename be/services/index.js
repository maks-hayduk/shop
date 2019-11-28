import pool from './dbPoolService';

import AuthService from './authService';
import ItemsService from './itemsService';
import OrderService from './orderService';
import UserService from './userService';

const authService = new AuthService();
const itemsService = new ItemsService();
const orderService = new OrderService();
const userService = new UserService();

export { pool, authService, itemsService, orderService, userService };
