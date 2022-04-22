const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Usuari = new Schema(
  {
    correo: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    telefono: { type: Number, required: true },
    fotoUrl: { type: String, required: true },
    nombreContactoEmergencia: { type: String, required: false },
    movilContactoEmergencia: { type: String, required: false },
    polizaSeguros: { type: String, required: false },
    puntuacion : {type: Number},
    productosFavoritos : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }],
    productosDiario : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }]

  },
  { timestamps: true }
);
const usuario = mongoose.model("Usuari", User);
module.exports = usuario;