const Sequelize = require('sequelize');
 const sequelize = require('./db');

const Pedido = sequelize.define('pedido', {
    estado:Sequelize.ENUM('PDTE-PAGO','PAGADO','CANCELADO','EN_TRANSITO','COMPLETO')
});
module.exports=Pedido;