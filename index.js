const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { connect } = require("./app/api/config/db");
var bodyParser = require('body-parser')


const usersRoutes = require("./app/api/routes/user.routes");
const ingredienteRoutes = require("./app/api/routes/ingrediente.routes");
const productoRoutes = require ("./app/api/routes/producto.routes")
const diarioRoutes = require ("./app/api/routes/diario.routes")



const server = express();
connect();

PORT = 5000;

//HEADERS-CABECERAS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//CORS
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//DEFINO LA SECRETKEY
server.set("secretKey", "supercalifragilisticuespialodoso");

server.use(logger("dev"));

server.use(express.json());
//server.use(express.urlencoded({ extended: true }));

server.use(bodyParser.urlencoded({
        extended: false
}));
server.use(bodyParser.json());


server.use("/users", usersRoutes);
server.use("/ingredientes", ingredienteRoutes);
server.use("/productos", productoRoutes)
server.use("/diario", diarioRoutes)

server.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
