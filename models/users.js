const Sequelize = require('sequelize');
 const sequelize = require('./db');

const Usuario = sequelize.define('users', {
    
    email: {type:Sequelize.STRING(100),allowNull:false, unique:true},
    password:Sequelize.STRING(40),
    nombre: Sequelize.STRING(50),
    apellidos: Sequelize.STRING(80)
    
  });  
module.exports=Usuario;

