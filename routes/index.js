var express = require('express');
//indica que requiere express
var router = express.Router();
// router es el que me indica todas las rutas
/* GET home page. */
//cada vez que le pida router por get me aplica esa función, separo todas las rutas en funciones
//req=request petición , res=responsive respuesta, next=siguiente
router.get('/', function(req, res, next) {
  const products = [
    {nombre:"Microondas", precio:45, existencias:6},
    {nombre:"frigorífico", precio:200, existencias:4},
    {nombre:"lámpara", precio:20, existencias:14},
    {nombre:"tv",precio:90, existencias:0},
    {nombre:"lavadora",precio:290,existencias:3},
    {nombre:"secadora",precio:180, existencias:5}
  ];
  //respondeme con el render(dibujo en html)
  res.render('index', { title: 'Silverado', products });
});

module.exports = router;
