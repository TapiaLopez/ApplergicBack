//CREATE MULTIPLE -> Esperar múltiples ingredientes como entrada y adaptar el método create para entrar múltiples ingredientes

//        req.body.miArrayDeObjetos // objeto! req.body.


const Ingredientes = require("../models/Ingrediente")
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//CREATE SINGLE -> Esperar la entrada de QR, codigo de barras de API de un producto y entrarlo (Método single)
//REMOVE -> Eliminar productos en la ficha de productos de usuario
//UPDATE -> Poder modificar los productos en la ficha de productos de usuario
//DELETE -> Poder eliminar los productos en la ficha de productos de usuario
const newIngredientes = async (req, res, next) => {
    try {
      const newIngredientes= new Ingredientes();
     
        newIngredientes.comentario = req.body.comentario;
        newIngredientes.producto = req.body.producto;
        newIngredientes.usuario = req.body.usuario; //esperaremos múltiples ingredientes
        
        const ingredientesSaved = await newIngredientes.save();

        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { ingrediente: ingredientesSaved }
          });
        } catch (err) {
          return next(err);
        }

    }

    const getAllIngredientes = async (req, res, next) => {
   
        try {
          const ingredientes = await Ingredientes.find();
          return res.status(200).json(ingredientes);
        } catch (error) {
          return next(error);
        }
      };
          
      
/*
      const getIngredienteById = async (req, res, next) => {
         
        try {
          const { ingredienteId } = req.params;
                    
          const ingredienteDb = await Diario.findById(diarioId);
               
          return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { diario: diarioDb },
          });
        } catch (err) {
          return next(err);
        }
      };
      */

      
      
      /*const updateDiarioById = async (req, res, next) => {
              
        try {
          const { diarioId } = req.params;
          //const authority = req.authority.id
          const userDiario = await Diario.findById(DiarioId)
      
          //if (authority == userLibro.author._id) {
      
            const diarioToUpdate = new Diario();
            if (req.body.comentario) productoToUpdate.comentario = req.body.comentario;
            if (req.body.producto) productoToUpdate.producto = req.body.producto;
            if (req.body.usuario) productoToUpdate.usuario = req.body.usuario;
      
            diarioToUpdate._id = diarioId;
            const diarioUpdated = await diarioToUpdate.findByIdAndUpdate(diarioId, diarioToUpdate);
            return res.json({
              status: 200,
              message: HTTPSTATUSCODE[200],
              data: { diarios: diarioUpdated }
            });
     
      
        } catch (err) {
          return next(err);
        }
      }*/
module.exports = {
    newIngredientes,
    getAllIngredientes,
}