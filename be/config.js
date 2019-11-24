import dotenv from 'dotenv';

const { DB_PASSWORD, DB_USERNAME, DB_NAME, SECRET_KEY } = dotenv.config().parsed;

const config = {
  dbpassword: DB_PASSWORD,
  dbusername: DB_USERNAME,
  dbname: DB_NAME,
  secretKey: SECRET_KEY
}

export default Object.freeze(config);
