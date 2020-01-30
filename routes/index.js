var express = require('express');
//indica que requiere express
var router = express.Router();
var products= require("../models/products");
// router es el que me indica todas las rutas,direcciones,asocia rutas con funciones
/* GET home page. */
//cada vez que le pida router por get me aplica esa función, separo todas las rutas en funciones
//req=request petición , res=response respuesta, next=siguiente
router.get('/', function(req, res, next) {
  
  //respondeme con el render(dibujo en html)
  res.render('index', { title: 'Silverado', products });  
});
//hacemos una ruta que es variable y requerimos de la lista de los productos por su referencia
//busco el producto que coincide con la referencia ref
router.get('/products/:ref', function(req, res, next) {
  var ref = req.params.ref;
  const product = products.find(function(p){
    return p.ref==ref;
  });
//con el render pasamos  los productos {product} a la plantilla 'product'
if (product){
 
  res.render ('product', {product});
}else{
  //si no existe ese preducto me redirecciona a la página de error
  res.redirect("/error");
}
});

module.exports = router;
