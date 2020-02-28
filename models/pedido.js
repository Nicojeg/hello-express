const Sequelize = require('sequelize');
 const sequelize = require('./db');

const Pedido = sequelize.define('pedido', {
    estado:Sequelize.ENUM('PDTE-PAGO','PAGADO','CANCELADO','EN_TRANSITO','COMPLETO'),
    direccionEntrega:Sequelize.STRING(200)
});
module.exports=Pedido;