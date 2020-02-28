
const sequelize =require('./db')//importaciones
const Producto = require('./products')
const Usuario = require('./users')
const Carrito = require('./carrito')
const Pedido = require('./pedido')

//Finalmente conectamos con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();//crea las tablas si no las hay
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  module.exports ={//exportaciones
      Producto,
      Usuario,
      Carrito,
      Pedido
      
      
  }