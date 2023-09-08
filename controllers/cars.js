const Car = require("../models/car");
const User = require("../models/user");
const { HttpError, addCarSchema } = require("../helpers");

const getAllCars = async (req, res, next) => {
  console.log(req.query);
  /* const {
    mark,
    model,
    type,
    year,
    transmission,
    fueltype,
    mileage,
    engine,
    power,
    color,
    price,
    city,
  } = req.query; */
  try {
    const result = await Car.find().sort("-date").populate("owner", "name");
    res.status(200).json({
      data: result,
      status: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const getOneCar = async (req, res, next) => {
  const { carId } = req.params;
  try {
    const result = await Car.findById(carId);
    res.status(200).json({
      data: [result],
      status: "OK",
    });
  } catch (error) {
    next(error);
  }
};

const getFavoriteCars = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const allCars = await Car.find().sort("-date").populate("owner", "name");
    const { favorites } = await User.findById(owner);

    const favoritesByUser = allCars.filter((oneCar) => {
      const isElement = favorites.find((favorite) => {
        return favorite === oneCar._id.toString();
      });
      if (isElement) {
        return true;
      } else {
        return false;
      }
    });

    res.status(200).json({
      data: favoritesByUser,
      status: "OK",
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
      status: "OK",
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
    const result = await Car.create({ ...req.body, owner });
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const changeCar = async (req, res, next) => {
  const { carId } = req.params;

  try {
    const { error } = addCarSchema.validate(req.body);
    if (error) {
      throw HttpError(404, "missing required name field");
    }

    const result = await Car.findByIdAndUpdate(
      carId,
      { ...req.body },
      {
        new: true,
      }
    );

    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  const { _id: user } = req.user;
  const { carId } = req.params;

  try {
    const car = await Car.findById(carId);

    if (car.owner.toString() === user.toString()) {
      const deletedCar = await Car.findByIdAndRemove(carId);
      if (!deletedCar) {
        throw HttpError(404, "not found");
      }
    } else {
      throw HttpError(404, "you can not delete this item");
    }
    const carsAfterDelete = await Car.find()
      .sort("-date")
      .populate("owner", "name");
    res.status(200).json({ data: carsAfterDelete });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCars,
  addCar,
  getUserCars,
  getFavoriteCars,
  deleteCar,
  getOneCar,
  changeCar,
};
