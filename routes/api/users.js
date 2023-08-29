const express = require("express");

// створюємо окрему сторінку записної книжки
const router = express.Router();

const { authenticate } = require("../../middlewares");

const ctrl = require("../../controllers");

router.post("/register", ctrl.userRegister);

router.post("/login", ctrl.userLogin);

router.post("/logout", authenticate, ctrl.userLogout);

router.put("/changeFavorite", authenticate, ctrl.userChangeFavorite);

router.get("/current", authenticate, ctrl.userCurrent);

module.exports = router;
