const express = require("express");
const router = express.Router();
const { newProducto, getAllProductos,getProductoById,deleteProductoById, updateProductoById} = require("../controllers/producto.controller");

router.post("/newProducto", newProducto);//OK
router.get("/getAllProductos", getAllProductos);//OK
router.get("/getProductoById/:productoId", getProductoById);//OK
router.delete("/deleteProductoById/:productoId", deleteProductoById);//OK
router.put("/updateProductoById/:productoId", updateProductoById);

module.exports = router;    