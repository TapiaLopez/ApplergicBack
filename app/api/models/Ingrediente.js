const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Ingrediente = new Schema(
  { 
    nombre: { type: String, required: true },

  },
  { timestamps: true }
);
const ingrediente = mongoose.model("Ingrediente", Ingrediente);
module.exports = ingrediente;