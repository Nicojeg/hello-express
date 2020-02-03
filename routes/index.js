var express = require('express');
//indica que requiere express
var router = express.Router();
var products = require("../models/products.js");
var users = require('../models/users.js');
// router es el que me indica todas las rutas,direcciones,asocia rutas con funciones
/* GET home page. */
//cada vez que le pida router por get me aplica esa función, separo todas las rutas en funciones
//req=request petición , res=response respuesta, next=siguiente
router.get('/', function(req, res, next) {
  const usuario =req.session.user;
  //respondeme con el render(dibujo en html)
  res.render('index', { title: 'Silverado', usuario,  products });  
});
//hacemos una ruta que es variable y requerimos de la lista de los productos por su referencia
//busco el producto que coincide con la referencia ref
router.get('/products/:ref', function(req, res, next) {
  var ref = req.params.ref;
  
  const product = products.find(function(p){
    return p.ref==ref;
  });

  
  if (product){
  //con el render pasamos  los productos {product} a la plantilla 'product'
    res.render ('product', {product});
  }else{
    //si no existe ese preducto me redirecciona a la página de error
    res.redirect("/error");
  }
});

var cesta =[]; //provisional

router.post("/comprar", function(req, res, next){
    const ref =req.body.ref;
    const product = products.find(function(p){
      return p.ref==ref;
    });

 //añadimos producto a la cesta
  cesta.push(product);
 //redirigimos a página de productos
 res.redirect("/");
 });
 router.get("/login", function (req, res, next){
 //cuando se pregunte por login tiene que hacer la función
   res.render("login");
  });
  /**procesamiento del formulario de login. Obtiene los datos del formulario en la petición (req) 
   * y comprueba si hay algún usuario con ese nombre 
   * y contraseña
   * si coincide genera una cookie y dirige a la página principal.
   * si no coincide, vuelve a cargar la página de login para mostrar un error
   */

  router.post("/login", function (req, res, next){
  /**const usuario = req.body.usuario;
   const password = req.body.password;*/
  /** sería lo mismo que hacer de esta otra manera */
    const {usuario, password} = req.body;
    const user = users.find(function (u) {
      return (u.usuario == usuario && u.password == password);
    
    });
    if (user){req.session.user =usuario;
      //generar la cookie
      
      res.redirect("/");
    }else{
      //meter un mensaje de error en pantalla
      res.render("login");
    }
  });


module.exports = router;

