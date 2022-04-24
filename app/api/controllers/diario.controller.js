const Diario = require("../models/diario")
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");

//CREATE SINGLE -> Esperar la entrada de QR, codigo de barras de API de un producto y entrarlo (Método single)
//REMOVE -> Eliminar productos en la ficha de productos de usuario
//UPDATE -> Poder modificar los productos en la ficha de productos de usuario
//DELETE -> Poder eliminar los productos en la ficha de productos de usuario
const newDiario = async (req, res, next) => {
    try {
      const newDiario= new Diario();
     
        newDiario.comentario = req.body.comentario;
        newDiario.producto = req.body.producto;
        newDiario.usuario = req.body.usuario; //esperaremos múltiples ingredientes
        
        const diarioSaved = await newDiario.save();

        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { diario: diarioSaved }
          });
        } catch (err) {
          return next(err);
        }

    }

    const getAllDiario = async (req, res, next) => {
   
        try {
          const diario = await Producto.find().populate("producto");
          return res.status(200).json(Producto);
        } catch (error) {
          return next(error);
        }
      };
      router.post("/createDiario", async (req, res, next) => {
        try {
          const newDiario = new Diario({
            comentario: req.body.comentario,
            producto: req.body.producto,
            usuario: req.body,usuario
          });
      
          const createdDiario = await newDiario.save();
          return res.status(201).json(createdDiario);
        } catch (error) {
          next(error);
        }
      });     
      router.get("/searchByproducto/:producto", async (req, res, next) => {
        const { producto } = req.params;
      
        try {
          const diarioByproducto = await Diario.find({ producto });
          return res.status(200).json(diarioByproducto);
        } catch (error) {
          return next(error);
        }
      });

      const getDiarioById = async (req, res, next) => {
         
        try {
          const { diarioId } = req.params;
                    
          const diarioDb = await Diario.findById(diarioId);
               
          return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { diario: diarioDb },
          });
        } catch (err) {
          return next(err);
        }
      };
      
      const deleteDiarioById = async (req, res, next) => {
              
        try {
          const { diarioId } = req.params;
          //const authority = req.authority.id
          const userDiario = await Diario.findById(diarioId)
      
          //if (authority == userLibro.author._id) {
      
            const diarioDeleted = await Diario.findByIdAndDelete(diarioId);
            if (!diarioDeleted) {
              return res.json({
                status: 200,
                data: null
              })
            } else {
              return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { diario: diarioDeleted },
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
      
      const updateDiarioById = async (req, res, next) => {
              
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
      }
module.exports = {
    newDiario,
    getAllDiario,
    getDiarioById,
    deleteDiarioById,
    updateDiarioById,

}