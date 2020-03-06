var express = require('express');
//indica que requiere express
var router = express.Router();

var users = require('../models/users.js');

const {Producto,Usuario,Carrito} =require('../models');//requerimos desde models producto y usuario
// router es el que me indica todas las rutas,direcciones,asocia rutas con funciones
/* GET home page. */
//cada vez que le pida router por get me aplica esa función, separo todas las rutas en funciones
//req=request petición , res=response respuesta, next=siguiente
router.get('/', function(req, res, next) {
  const usuario =req.session.user;
  //respondeme con el render(dibujo en html)
  Producto.findAll().then(products=>{
    res.render('index', { title: 'Silverado', usuario,  products });
  })   
});
//hacemos una ruta que es variable y requerimos de la lista de los productos por su referencia
//busco el producto que coincide con la referencia ref
router.get('/products/:ref', function(req, res, next) {
  var ref = req.params.ref;
  Producto.findOne({
    where: {referencia: ref}
  })
  .then(product =>{
    if (product){
    //con el render pasamos  los productos {product} a la plantilla 'product'
      res.render ('product', {product});
    }else{
      //si no existe ese producto me redirecciona a la página de error
      res.redirect("/error");
    }
  });

})


var cesta =[]; //provisional

router.post("/comprar", function(req, res, next){
    const referencia =req.body.referencia;
    Producto.findOne({where:{referencia}})
    .then(producto=>{
      if(producto){
        const userId = req.session.userId;
        if(!userId) res.redirect("/login");
        Carrito.findOrCreate({where: {userId},include:[Producto], defaults: {userId}})
        .then(([carrito, created])=>{
          var productos = carrito.productos;
          var p = productos.find(p => p.referencia==referencia);
          if (p){
            p.productocarrito.increment({cantidad:1})
            .then(()=>{res.redirect("/carrito")
          });
          }else{
            carrito.addProducto(producto)
            .then(()=>{
              res.redirect("/carrito");
            })
          }
         
        })
      }else{
        res.render("error",{message:"No existe el producto solicitado"});
      }
         
    });

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
  
    const {email, password} = req.body;//en body tengo los datos del login
    Usuario.findOne({where:{email,password}})
    .then(usuario=>{
      if (usuario){
        req.session.userId=usuario.id;
        //generar la cookie 
        res.redirect("/");
      }else{
        //meter un mensaje de error en pantalla
        res.render("login");
      }
    })
    });
  
  router.get("/registro", function(req,res,next){
    res.render("registro",{error:undefined,datos:{}}); //error indefinido y datos en vacio, para que me de la posibilidad
  });

  router.post("/registro", function (req, res, next){
    const datos = req.body;
      if(datos.nombre.length == 0 ){
        res.render("registro",{datos, error:"Nombre no puede estar vacio"});
      }
      else if(datos.apellidos.length == 0 ){
        res.render("registro",{datos, error:"Apellidos no puede estar vacio"});
      }
      else if(datos.email.length == 0 ){
        res.render("registro",{datos, error:"Email no puede estar vacio"});
      }
      else if(!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(datos.email)){
        res.render("registro",{datos,error:"Email no válido"});
      }
      else if(datos.password.length < 6 ){
        res.render("registro",{datos, error:"Password ha de tener al menos 6 caracteres"});
      }
      else if (datos.password != datos.repassword){
        res.render("registro", {datos, error:"Los dos password no coinciden"});
      
      Usuario.create(datos)
      .then(usuario=>{
        
        res.redirect("/login");
      });
     
    
    }
  }); 
  router.get("/carrito", function(req,res,next){
    const userId = req.session.userId;
    if(!userId) res.redirect("/login");
    else{
      Carrito.findOne({where:{userId},include:[Producto]})
      .then(carrito=>{
        const productos =carrito.productos;
        const total = productos.reduce((total, p) => total + p.precio * p.productocarrito.cantidad, 0);
        res.render("carrito",{productos,total});
      });
    }
    
  });
   router.post("/checkout", function(req,res,next){
    const userId = req.session.userId;
    if(!userId) res.redirect("/login");
    else{
      Carrito.findOne({where:{userId},include:[Producto]})
      .then(carrito=>{
        const productos =carrito.productos;
      if (productos.every(p => p.existencias >=p.productocarrito.cantidad)){

    
      }else{
        for(var i=0;i<productos.length;i++){
          productos[i].hayExistencias= productos[i].existencias >= productos[i].productocarrito.cantidad;
        }
        
        const total = productos.reduce((total, p) => total + p.precio * p.productocarrito.cantidad, 0);
    res.render("carrito",{productos,total});
           }
       } 
    )

    }
   });
module.exports = router;

