import AuthService from './authService';
import pool from './dbPoolService';

const authService = new AuthService();

export { pool, authService };
