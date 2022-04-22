const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingrediente = new Schema(
  { 
    nombre: { type: String, required: true },
    tipo: { type: String, required: true }, //alergia // intolerancia
    notas: { type: String, required: true }, //alergia // intolerancia
  },
  { timestamps: true }
);
const ingrediente = mongoose.model("Ingrediente", Ingrediente);
module.exports = ingrediente;