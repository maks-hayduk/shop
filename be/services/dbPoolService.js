import pg from 'pg';
import config from '../config';

const Pool = pg.Pool;

const pool = new Pool({
  user: config.dbusername,
  host: 'localhost',
  database: config.dbname,
  password: config.dbpassword,
  port: 5433,
})

export default pool;
