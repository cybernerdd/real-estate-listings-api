const app = require('./app');
const { appConfig } = require('./config/config');
const { connectMySQL, connectMongo } = require('./config/database');

async function start() {
  try {
    await connectMySQL();
  } catch (e) {
    console.error('MySQL connection failed:', e.message);
  }

  try {
    await connectMongo();
  } catch (e) {
    console.error('Mongo connection failed (will continue if not needed yet):', e.message);
  }

  app.listen(appConfig.port, () => {
    console.log(`Server listening on port ${appConfig.port}`);
  });
}

start();



