// Cargamos el modelo
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../utils/httpStatusCode");
// const {upload,uploadToCloudinary}= require('../../middlewares/file.middlewares')
//USUARIO SINGLE -> CREATE
//USUARIO UPDATE -> UPDATE



const createUser = async (req, res, next) => {
  try {
    const newUser = new User();
    console.log(req.body)
    newUser.nombre = req.body.nombre;
    // newUser.fotoUrl = req.body.file_url;
    newUser.correo = req.body.correo;
    newUser.password = req.body.password;
    newUser.direccion = req.body.direccion;
    newUser.telefono = req.body.telefono;
    newUser.nombreContactoEmergencia = req.body.nombreContactoEmergencia;
    newUser.correoContactoEmergencia = req.body.correoContactoEmergencia;
    newUser.telefonoContactoEmergencia = req.body.telefonoContactoEmergencia;
    newUser.polizaSeguros = req.body.polizaSeguros;
    newUser.puntuacion = req.body.puntuacion;
    newUser.productosFavoritos = req.body.productosFavoritos;
    newUser.productosDiarios = req.body.productosDiarios;
    newUser.ingredientes = req.body.ingredientes;
    newUser.diario = req.body.diario;
    newUser.fotoUrl = req.fotoUrl;

    const UserDb = await newUser.save();

    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: UserDb,
    });
  } catch (err) {
    return next(err);
  }
};

const authenticate = async (req, res, next) => {
  try {
    console.log(req.body.correo)
    const userInfo = await User.findOne({ correo: req.body.correo });
    console.log(userInfo);
    //comprobar parametros correctos (naming)
    console.log(req.body.password)
    console.log(userInfo.password)
    console.log("b4 bcrypt")

    if (bcrypt.compareSync(req.body.password, userInfo.password)) {
      console.log("he pasado bcrypt")
      userInfo.password = null;
      const token = jwt.sign(
        {
          id: userInfo._id,
          nombre: userInfo.nombre,
        },
        req.app.get("secretKey"),
        { expiresIn: "1h" }
      );
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { User: userInfo, token: token },
      });
    } else {
      return res.json({
        status: 400,
        message: HTTPSTATUSCODE[400],
        data: null,
      });
    }
  } catch (err) {
    return next(err);
  }
};
const logout = (req, res, next) => {
  try {
    req.headers.authorization = null;
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      token: null,
    });
  } catch (err) {
    return next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).populate("ingredientes");

    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { usuario: user },
    });
  } catch (err) {
    return next(err);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.json({
        status: 404,
        message: HTTPSTATUSCODE[404],
        data: { usuario: null },
      });
    } else {
      user.nombre = req.body.nombre ? req.body.nombre : user.nombre ;
      user.correo = req.body.correo  ? req.body.correo : user.correo;
      //user.password = req.body.password ;
      user.direccion = req.body.direccion  ? req.body.direccion : user.direccion;
      user.telefono = req.body.telefono  ? req.body.telefono : user.telefono;
      user.nombreContactoEmergencia = req.body.nombreContactoEmergencia  ? req.body.nombreContactoEmergencia : user.nombreContactoEmergencia;
      user.correoContactoEmergencia = req.body.correoContactoEmergencia  ? req.body.correoContactoEmergencia : user.correoContactoEmergencia;
      user.telefonoContactoEmergencia = req.body.telefonoContactoEmergencia  ? req.body.telefonoContactoEmergencia : user.telefonoContactoEmergencia;
      user.polizaSeguros = req.body.polizaSeguros  ? req.body.polizaSeguros : user.polizaSeguros;
      user.puntuacion = req.body.puntuacion  ? req.body.puntuacion : user.puntuacion;
      user.productosFavoritos = req.body.productosFavoritos  ? req.body.productosFavoritos : user.productosFavoritos;
      user.productosDiarios = req.body.productosDiarios  ? req.body.productosDiarios : user.productosDiarios;
      user.diario = req.body.diario  ? req.body.diario : user.diario;
      user.ingredientes = req.body.ingredientes  ? req.body.ingredientes : user.ingredientes;

      const userUpdated = await user.save();

      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { usuario: userUpdated },
      });
    }
  } catch (err) {
    return next(err);
  }
};


/*const createUploadPic = async (req, res, next) => {
  try {
    const characterPicture = req.file ? req.file.filename : null;
    // Crearemos una instancia de character con los datos enviados
    const newCharacter = new Character({
        name: req.body.name,
        age: req.body.age,
        alias: req.body.alias,
        role: req.body.role,
        picture: characterPicture
    });
    // Guardamos el personaje en la DB
    const createdCharacter = await newCharacter.save();
    return res.status(201).json(createdCharacter);
} catch (error) {
    // Lanzamos la función next con el error para que lo gestione Express
    next(error);
}
}*/
module.exports = {
  createUser,
  authenticate,
  logout,
  updateUserById,
  getUserById,
};
