const express = require("express");

const Diario = require("../models/diario.controller");

const router = express.Router();

router.get("/", async (req, res, next) => { 

try {  const diario = await Diario.find().populate("productos"); 

return res.status(200).json(diario);   } catch (error) {     return next(error);   } });

router.post("/createDiario", async (req, res, next) => {   try {     
   
    const newDiario = new Diario({      
         comentario: req.body.comentario,       
         population: req.body.population,   
            producto: req.body.producto,      
            });     

 const createdDiario = await newDiario.save();   
   
 return res.status(201).json(createdDiario);   } 
  
   catch (error) {     next(error);   } });

   router.get("/searchByProducto/:producto", async (req, res, next) => {  

        const { producto } = req.params;    
        try {     const productoByName = await producto.find({ name }); 
         return res.status(200).json(productoByName);   }
          catch (error) {     return next(error);   } });
router.get("/", async (req, res, next) => {
  try {
    const producto = await producto.find().populate("productos");
    return res.status(200).json(producto);
  } catch (error) {
    return next(error);
  }
});

router.post("/createDiario", async (req, res, next) => {
  try {
    const newDiario = new Diario({
        comentario: req.body.comentario,       
        population: req.body.population,   
        producto: req.body.producto,  
    });

    const createdDiario = await newDiario.save();
    return res.status(201).json(createdDiario);
  } catch (error) {
    next(error);
  }
});

router.get("/searchById/:Id", async (req, res, next) => {
  const { Id } = req.params;

  try {
    const diarioById = await Diario.find({ Id });
    return res.status(200).json(diarioById);
  } catch (error) {
    return next(error);
  }
});

module.exports = {
    createDiario,
    searchById,
  }