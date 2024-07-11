// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('udgam_product', 'root', '', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// module.exports = sequelize;

require('dotenv').config();

// Import Sequelize
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
  }
);


// Authenticate the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database using Sequelize');
  })
  .catch(err => {
    console.error('Unable to connect to the MySQL database:', err);
  });

module.exports = sequelize;
