const express = require("express");

const ctrl = require("../../controllers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllCars);

router.get("/user", authenticate, ctrl.getUserCars);

router.post("/", authenticate, ctrl.addCar);

module.exports = router;
