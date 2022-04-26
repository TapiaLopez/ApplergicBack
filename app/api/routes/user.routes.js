const express = require("express");
const router = express.Router();
const { createUser, authenticate, logout, updateUserById, getUserById } = require("../controllers/user.controller");
const { isAuth } = require("../../middlewares/auth.middleware")

router.post("/register", createUser);
router.post("/authenticate", authenticate);
router.post("/logout", [isAuth], logout)
router.put("/updateUserById/:id", [isAuth], updateUserById);
router.get("/getUserById/:id", [isAuth], getUserById);


module.exports = router;    