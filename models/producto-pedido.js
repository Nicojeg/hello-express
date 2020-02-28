const Sequelize = require('sequelize');
 const sequelize = require('./db');

 const ProductoPedido=sequelize.define('producto-pedido',{
cantidad:{type:Sequelize.INTEGER,
           allowNull:false,
        defaultValue:1}

 });
 module.exports=ProductoPedido;