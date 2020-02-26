const Sequelize = require('sequelize');

const sequelize = new Sequelize('nueva_tienda', 'root', '', {
  host: 'localhost',
  dialect:  'mariadb' 
});
module.exports=sequelize;
