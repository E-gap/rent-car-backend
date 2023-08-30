const express = require("express");

const ctrl = require("../../controllers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllCars);

router.get("/favorite", authenticate, ctrl.getFavoriteCars);

router.get("/user", authenticate, ctrl.getUserCars);

router.post("/", authenticate, ctrl.addCar);

module.exports = router;
