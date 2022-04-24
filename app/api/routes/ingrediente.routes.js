const express = require("express");
const router = express.Router();
const { newProducto, getAllProductos,getProductoById,deleteProductoById, updateProductoById} = require("../controllers/producto.controller");

router.post("/newProducto", newProducto);
router.post("/getAllProductos", getAllProductos);
router.post("/getProductoById", getProductoById);
router.post("/deleteProductoById", deleteProductoById);
router.post("/updateProductoById", updateProductoById);

module.exports = router;    