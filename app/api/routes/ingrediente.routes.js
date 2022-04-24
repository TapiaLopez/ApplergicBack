const express = require("express");
const router = express.Router();
const { newIngredientes, getAllIngredientes} = require("../controllers/ingrediente.controller");

router.post("/newIngrediente", newIngredientes);
router.post("/getAllIngredientes", getAllIngredientes);


module.exports = router;    