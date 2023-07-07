const Car = require("../models/car");
const { HttpError, addCarSchema } = require("../helpers");

const getAllCars = async (req, res, next) => {
  try {
    const result = await Car.find().sort("-date").populate("owner", "name");
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserCars = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const result = await Car.find({ owner: owner })
      .sort("-date")
      .populate("owner", "name");
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addCar = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const { error } = addCarSchema.validate(req.body);
    if (error) {
      throw HttpError(404, "missing required name field");
    }
    console.log(req.body);
    const result = await Car.create({ ...req.body, owner });
    console.log(result);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  addCar,
  getUserCars,
};
