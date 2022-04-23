const Producto = require("../models/Producto")
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//CREATE SINGLE -> Esperar la entrada de QR, codigo de barras de API de un producto y entrarlo (Método single)
//REMOVE -> Eliminar productos en la ficha de productos de usuario
//UPDATE -> Poder modificar los productos en la ficha de productos de usuario
//DELETE -> Poder eliminar los productos en la ficha de productos de usuario
const newProducto = async (req, res, next) => {
    try {
      const newProducto = new Producto();
     
        newProducto.nombre = req.body.name;
        newProducto.description = req.body.description;
        newProducto.ingredientes = req.body.ingredientes; //esperaremos múltiples ingredientes
        
        const productSaved = await newProducto.save();
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { libros: productSaved }
          });
        } catch (err) {
          return next(err);
        }

    }

module.exports = {
    newProducto,

}