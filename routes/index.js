var express = require('express');
//indica que requiere express
var router = express.Router();
// router es el que me indica todas las rutas,direcciones,asocia rutas con funciones
/* GET home page. */
//cada vez que le pida router por get me aplica esa función, separo todas las rutas en funciones
//req=request petición , res=response respuesta, next=siguiente
router.get('/', function(req, res, next) {
  const products = [
    {nombre:"Microondas", precio:45, existencias:6, imagen:"microondas.jpg"},
    {nombre:"frigorífico", precio:2500, existencias:4, imagen:"frigo.jpg"},
    {nombre:"lámpara", precio:20, existencias:14, imagen:"lampara.jpg"},
    {nombre:"tv",precio:500, existencias:0, imagen:"tv.jpg"},
    {nombre:"lavadora",precio:290,existencias:3, imagen: "lavadora.jpg"},
    {nombre:"secadora",precio:180, existencias:5, imagen: "secadora.jpg"}
  ];
  //respondeme con el render(dibujo en html)
  res.render('index', { title: 'Silverado', products });
});

module.exports = router;
