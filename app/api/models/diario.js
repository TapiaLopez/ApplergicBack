
diario:

comentario
{ producto
usuario
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Diario = new Schema(
  { 
    comentario: { type: String, required: false },
    producto : [{ type: Schema.Types.ObjectId, ref: "producto", required: true }],
    usuario : [{ type: Schema.Types.ObjectId, ref: "usuario", required: true }],

},
  { timestamps: true }
);
const diario = mongoose.model("Ingrediente", Ingrediente);
module.exports = ingrediente;