const express = require("express");
const router = express.Router();
const { newDiario, getAllDiario, getDiarioById, deleteDiarioById, updateDiarioById} = require("../controllers/diario.controller");

router.post("/newDiario", newDiario);
router.get("/getAllDiarioByUser/:idUsuario", getAllDiario);
router.get("/getDiarioById/:diarioId", getDiarioById);
router.delete("/deleteDiarioById/:idDiario", deleteDiarioById);
router.put("/updateDiarioById/:idDiario", updateDiarioById);




module.exports = router;    