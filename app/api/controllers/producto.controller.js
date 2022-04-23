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
        newProducto.descripcion = req.body.descripcion;
        newProducto.ingredientes = req.body.ingredientes; //esperaremos múltiples ingredientes
        newProducto.notas = req.body.notas;
        newProducto.usuario = req.body.usuario;

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
          const productos = await Pais.find().populate("cities");
          return res.status(200).json(paises);
        } catch (error) {
          return next(error);
        }
      };
      router.post("/createProducto", async (req, res, next) => {
        try {
          const newProducto = new Producto({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            ingredientes: req.body.ingredientes,
            notas: req.body.notas,
            usuario: req.body,usuario
          });
      
          const createdProducto = await newProducto.save();
          return res.status(201).json(createdProducto);
        } catch (error) {
          next(error);
        }
      });     
      router.get("/searchByName/:name", async (req, res, next) => {
        const { name } = req.params;
      
        try {
          const productoByName = await Producto.find({ name });
          return res.status(200).json(productoByName);
        } catch (error) {
          return next(error);
        }
      });

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
      
            const productoDeleted = await Producto.findByIdAndDelete(productoId);
            if (!productoDeleted) {
              return res.json({
                status: 200,
                data: null
              })
            } else {
              return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { productos: productoDeleted },
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
      
          //if (authority == userLibro.author._id) {
      
            const productoToUpdate = new Producto();
            if (req.body.nombre) productoToUpdate.nombre = req.body.nombre;
            if (req.body.descripcion) productoToUpdate.descripcion = req.body.descripcion;
            if (req.body.ingredientes) productoToUpdate.ingredientes = req.body.ingredientes;
            if (req.body.notas) productoToUpdate.notas = req.body.notas;
            if (req.body.usuario) productoToUpdate.usuario = req.body.usuario;
      
            productoToUpdate._id = productoId;
            const productoUpdated = await productoToUpdate.findByIdAndUpdate(productoId, productoToUpdate);
            return res.json({
              status: 200,
              message: HTTPSTATUSCODE[200],
              data: { productos: productoUpdated }
            });
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