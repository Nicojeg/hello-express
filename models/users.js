const Sequelize = require('sequelize');
 const sequelize = require('./db');

const Usuario = sequelize.define('users', {
    
    email: Sequelize.STRING,
    password:Sequelize.STRING,
    nombre: Sequelize.STRING,
    apellidos: Sequelize.STRING
    
  });  
module.exports=Usuario;
/*module.exports = [
    {usuario:"jairo", password:"123456"},
    {usuario:"pepito", password:"654321"},
    {usuario:"Nico", password:"121212"}
];*/
