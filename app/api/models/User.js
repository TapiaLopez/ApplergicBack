const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const saltRounds = 10;
const User = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, require:  false},
    phone: { type: Number, required: false },
    imgUrl: { type: String, required: false },
    nameContactEmergency: { type: String, required: false },
    emailContactEmergency: { type: String, required: false },
    phoneContactEmergency: { type: String, required: false },
    insurance: { type: String, required: false },
    rating : {type: Number},
    favoritesProducts : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }],
    diaryProducts : [{ type: Schema.Types.ObjectId, ref: "Productos", required: false }],
    ingredients : [{ type: Schema.Types.ObjectId, ref: "Ingrediente", required: false }],
    diary : [{ type: Schema.Types.ObjectId, ref: "Diario", required: false }]

  },
  { timestamps: true }
);
User.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
const user = mongoose.model("User", User);
module.exports = user;