const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const saltRounds = 10;
const User = new Schema(
  {
    correo: { type: String, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    direccion: { type: String, require:  false},
    telefono: { type: Number, required: false },
    fotoUrl: { type: String, required: false },
    nombreContactoEmergencia: { type: String, required: false },
    correoContactoEmergencia: { type: String, required: false },
    telefonoContactoEmergencia: { type: String, required: false },
    polizaSeguros: { type: String, required: false },
    puntuacion : {type: Number},
    productosFavoritos : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }],
    productosDiarios : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }],
    ingredientes : [{ type: Schema.Types.ObjectId, ref: "Ingrediente", required: false }],
    diario : [{ type: Schema.Types.ObjectId, ref: "Diario", required: false }]

  },
  { timestamps: true }
);
User.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
const user = mongoose.model("User", User);
module.exports = user;