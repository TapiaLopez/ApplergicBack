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
        newDiario.usuario = req.body.usuario; 
        
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
      const { idUsuario } = req.params;

        try {
          const diario = await Diario.find({ usuario: idUsuario});
          return res.status(200).json(diario);
        } catch (error) {
          return next(error);
        }
      };
      

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
          const { idDiario } = req.params;
          //const authority = req.authority.id
          const userDiario = await Diario.findById(idDiario)
          if (!userDiario) {
            return res.json({
              status: 404,
              message: HTTPSTATUSCODE[404],
              data: { diario: null }
            });
          }
          else {

         
          //if (authority == userLibro.author._id) {
      
            const diarioDeleted = await Diario.findByIdAndDelete(idDiario);
            if (!diarioDeleted) {
              return res.json({
                status: 200,
                data: null
              })
            } else {
              return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { diario: null },
              });
            }
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
          const { idDiario } = req.params;
          //const authority = req.authority.id
          const userDiario = await Diario.findById(idDiario)
          console.log(idDiario)
          //if (authority == userLibro.author._id) {
            if (!userDiario) {
              return res.json({
                status: 404,
                message: HTTPSTATUSCODE[404],
                data: { diarios: null }
              });
            }
            else {
            const diarioToUpdate = new Diario();
            if (req.body.comentario) diarioToUpdate.comentario = req.body.comentario;
            if (req.body.producto) diarioToUpdate.producto = req.body.producto;
            if (req.body.usuario) diarioToUpdate.usuario = req.body.usuario;
      
            diarioToUpdate._id = idDiario;
            await Diario.findByIdAndUpdate(idDiario, diarioToUpdate);
            const response = await Diario.findById(idDiario)

            return res.json({
              status: 200,
              message: HTTPSTATUSCODE[200],
              data: { diarios: response }
            });
            }
      
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