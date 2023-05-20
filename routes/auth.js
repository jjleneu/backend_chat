const { Router } = require("express");
const { crearUsuario, login, refreshToken } = require("../controller/auth_controller");
const { validarJWT } = require("../middlewares/validate_jwt");

const router = Router();


router.post("/new", crearUsuario);
router.post("/", login);
router.get("/refreshToken", validarJWT, refreshToken);

module.exports = router;
