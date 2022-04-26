const Producto = require("../models/Producto")
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//CREATE SINGLE -> Esperar la entrada de QR, codigo de barras de API de un producto y entrarlo (Método single)
//REMOVE -> Eliminar productos en la ficha de productos de usuario
//UPDATE -> Poder modificar los productos en la ficha de productos de usuario
//DELETE -> Poder eliminar los productos en la ficha de productos de usuario
const newProducto = async (req, res, next) => {
    try {
      const newProducto = new Producto();
     
        newProducto.nombre = req.body.nombre;
        newProducto.descripcion = req.body.descripcion;
        newProducto.ingredientes = req.body.ingredientes; //esperaremos múltiples ingredientes
        
        const productSaved = await newProducto.save();

        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { productos: productSaved }
          });
        } catch (err) {
          return next(err);
        }

    }

    const getAllProductos = async (req, res, next) => {
   
        try {
          const productos = await Producto.find();
          return res.status(200).json(productos);
        } catch (error) {
          return next(error);
        }
      };


      const getProductoById = async (req, res, next) => {
         
        try {
          const { productoId } = req.params;
                    
          const productoDb = await Producto.findById(productoId);
               
          return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { productos: productoDb },
          });
        } catch (err) {
          return next(err);
        }
      };
      
      const deleteProductoById = async (req, res, next) => {
              
        try {
          const { productoId } = req.params;
          //const authority = req.authority.id
          const userProducto = await Producto.findById(productoId)
      
          //if (authority == userLibro.author._id) {
      
            const deleteProductoById = await Producto.findByIdAndDelete(productoId);
            if (!deleteProductoById) {
              return res.json({
                status: 200,
                data: null
              })
            } else {
              return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: null
              });
            }
          /*} else {
            return res.json({
              status: 403,
              message: HTTPSTATUSCODE[403],
              data: null
            })
          }*/
        } catch (err) {
          return next(err);
        }
      };
      
      const updateProductoById = async (req, res, next) => {
              
        try {
          const { productoId } = req.params;
          //const authority = req.authority.id
            const userProducto = await Producto.findById(productoId)
            console.log(userProducto)
            console.log(productoId)
            //if (authority == userLibro.author._id) {
            if (!userProducto) {
              return res.json({
                status: 404,
                message: HTTPSTATUSCODE[404],
                data: { productos: null }
              });
            }
            else {
              const productoToUpdate = new Producto();
              if (req.body.nombre) productoToUpdate.nombre = req.body.nombre;
              if (req.body.descripcion) productoToUpdate.descripcion = req.body.descripcion;
              if (req.body.ingredientes) productoToUpdate.ingredientes = req.body.ingredientes;
              if (req.body.diario) productoToUpdate.diario = req.body.diario;
              //if (req.body.usuario) productoToUpdate.usuario = req.body.usuario;
        
              productoToUpdate._id = productoId;
              console.log(productoId)
              console.log(productoToUpdate)
              const productoUpdated = await Producto.findByIdAndUpdate(productoId, productoToUpdate);
              console.log(productoUpdated)
              return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { productos: productoUpdated }
              });
            }

          /*} else {
            return res.json({
              status: 403,
              message: HTTPSTATUSCODE[403],
              data: null
            })
          }*/
      
        } catch (err) {
          return next(err);
        }
      }
module.exports = {
    newProducto,
    getAllProductos,
    getProductoById,
    deleteProductoById,
    updateProductoById,

}