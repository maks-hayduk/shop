import dotenv from 'dotenv';

const { DB_PASSWORD } = dotenv.config().parsed;

const config = {
  dbpassword: DB_PASSWORD
}

export default Object.freeze(config);
