const express = require("express");

const ctrl = require("../../controllers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrl.getAllCars);

router.get("/favorite", authenticate, ctrl.getFavoriteCars);

router.get("/user", authenticate, ctrl.getUserCars);

router.post("/", authenticate, ctrl.addCar);

router.patch("/:carId", authenticate, ctrl.changeCar);

router.delete("/:carId", authenticate, ctrl.deleteCar);

router.get("/:carId", ctrl.getOneCar);

module.exports = router;
