const express = require("express");

const ctrl = require("../../controllers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllScores);

router.get("/user", authenticate, ctrl.getUserScores);

router.post("/", authenticate, ctrl.addScore);

module.exports = router;
