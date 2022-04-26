const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Producto = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    ingredientes : [{ type: Schema.Types.ObjectId, ref: "Ingrediente", required: false }],
    diario : [{ type: Schema.Types.ObjectId, ref: "diario", required: false }],
    /*usuario : [{ type: Schema.Types.ObjectId, ref: "Usuario", required: false }], // No podemos crear un producto si no estamos loguinados por lo tanto, necesitamos un usuario vinculado al producto
    favorito: [{ type: Schema.Types.ObjectId, ref: "favorito", required: false }],*/
  },
  { timestamps: true }
);
const producto = mongoose.model("Producto", Producto);
module.exports = producto;

