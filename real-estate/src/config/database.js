const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
const { mysqlConfig, mongoConfig } = require('./config');

let mysqlPool;

async function connectMySQL() {
  if (!mysqlPool) {
    mysqlPool = mysql.createPool(mysqlConfig);
  }
  // Validate connection
  await mysqlPool.query('SELECT 1');
  return mysqlPool;
}

async function connectMongo() {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  await mongoose.connect(mongoConfig.uri, {
    serverSelectionTimeoutMS: 5000,
  });
  return mongoose.connection;
}

module.exports = { connectMySQL, connectMongo };


