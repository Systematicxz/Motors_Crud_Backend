const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'motors',
  port: 5432,
  logging: false,
});

module.exports = { db };

// {
//   "name": "hola",
//   "email": "prueba@gmail.com",
//   "password": "1233456",
//   "status": "available"

// }
