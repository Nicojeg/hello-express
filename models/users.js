const Sequelize = require('sequelize');
 const sequelize = require('./db');

const Usuario = sequelize.define('users', {
    
    email: {type:Sequelize.STRING(100),allowNull:false, unique:true},
    password:Sequelize.STRING(40),
    nombre: {type:Sequelize.STRING(50),allowNull:false},
    apellidos: {type:Sequelize.STRING(80),allowNull:false}
    
  });  
module.exports=Usuario;

