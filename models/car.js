const { model } = require("mongoose");
const { carSchema } = require("../helpers");

const Car = model("car", carSchema);

module.exports = Car;
