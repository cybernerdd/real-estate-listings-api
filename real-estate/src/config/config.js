require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
};

const mysqlConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'real_estate',
  connectionLimit: Number(process.env.MYSQL_POOL || 10),
};

const mongoConfig = {
  uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/real_estate',
};

module.exports = { appConfig, mysqlConfig, mongoConfig };


