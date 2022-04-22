// Cargamos el modelo 
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
//USUARIO SINGLE -> CREATE
//USUARIO UPDATE -> UPDATE

const createUsuario = async (req, res, next) => {
  try {
    const newUsuario = new Usuario();

    //Empezad a entrar los datos del usuario tal que newUsuario.parametro:

    /*
    newUsuario.name = req.body.name;
    newUsuario.emoji = req.body.emoji;
    newUsuario.email = req.body.email;
    newUsuario.password = req.body.password;

    */ 
    
    // end entrar parametros

    
    const UsuarioDb = await newUsuario.save();
    

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: UsuarioDb
    });
  } catch (err) {
    return next(err);
  }
}

const authenticate = async (req, res, next) => {

  try {
    const UsuarioInfo = await Usuario.findOne({ correo: req.body.correo })

    //comprobar parametros correctos (naming)
    if (bcrypt.compareSync(req.body.password, UsuarioInfo.password)) {
      UsuarioInfo.password = null
      const token = jwt.sign(
        {
          id: UsuarioInfo._id,
          name: UsuarioInfo.name
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { Usuario: UsuarioInfo, token: token },
      });
    } else {
      return res.json({ status: 400, message: HTTPSTATUSCODE[400], data: null });
    }
  } catch (err) {
    return next(err);
  }
}
const logout = (req, res, next) => {
  try {
		req.headers.authorization = null;
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null
    });
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  createUsuario,
  authenticate,
  logout
}