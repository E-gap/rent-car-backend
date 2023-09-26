const Car = require("../models/car");
const User = require("../models/user");
const { HttpError, addCarSchema } = require("../helpers");

const limit = 10;

const getAllCars = async (req, res, next) => {
  const search = req.query;
  const { page } = req.query;
  const skip = (page - 1) * limit;
  const { sort } = req.query;
  const sortArray = sort && sort.split(" ");

  let sortRule = sort || "-date";
  if (sort && sortArray[1] === "down") {
    sortRule = "-" + sortArray[0].toString();
  } else if (sort && sortArray[1] === "up") {
    sortRule = sortArray[0].toString();
  }

  const newSearch = { ...search };
  delete newSearch.page;
  delete newSearch.sort;
  delete newSearch.limit;

  try {
    const resultAll = await Car.find(newSearch, "-createdAt -updatedAt")
      .sort(sortRule)
      .populate("owner", "name");

    const result = resultAll.slice(skip, skip + limit);

    res.status(200).json({
      data: result,
      status: "OK",
      total: resultAll.length,
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
  const search = req.query;
  const { page } = req.query;
  const skip = (page - 1) * limit;
  const { sort } = req.query;
  const sortArray = sort && sort.split(" ");

  let sortRule = sort || "-date";
  if (sort && sortArray[1] === "down") {
    sortRule = "-" + sortArray[0].toString();
  } else if (sort && sortArray[1] === "up") {
    sortRule = sortArray[0].toString();
  }

  const newSearch = { ...search };
  delete newSearch.page;
  delete newSearch.sort;
  delete newSearch.limit;

  try {
    const allCars = await Car.find(newSearch)
      .sort(sortRule)
      .populate("owner", "name");

    const { favorites } = await User.findById(owner);

    const favoritesByUserAll = allCars.filter((oneCar) => {
      const isElement = favorites.find((favorite) => {
        return favorite === oneCar._id.toString();
      });
      if (isElement) {
        return true;
      } else {
        return false;
      }
    });

    const result = favoritesByUserAll.slice(skip, skip + limit);

    res.status(200).json({
      data: result,
      status: "OK",
      total: favoritesByUserAll.length,
    });
  } catch (error) {
    next(error);
  }
};

const getUserCars = async (req, res, next) => {
  const { _id: owner } = req.user;
  const search = req.query;
  const { page } = req.query;
  const skip = (page - 1) * limit;
  const { sort } = req.query;
  const sortArray = sort && sort.split(" ");

  let sortRule = sort || "-date";
  if (sort && sortArray[1] === "down") {
    sortRule = "-" + sortArray[0].toString();
  } else if (sort && sortArray[1] === "up") {
    sortRule = sortArray[0].toString();
  }

  const newSearch = { ...search };
  delete newSearch.page;
  delete newSearch.sort;
  delete newSearch.limit;

  try {
    const resultAll = await Car.find({ owner, ...newSearch })
      .sort(sortRule)
      .populate("owner", "name");

    const result = resultAll.slice(skip, skip + limit);

    res.status(200).json({
      data: result,
      status: "OK",
      total: resultAll.length,
    });
  } catch (error) {
    next(error);
  }
};

const addCar = async (req, res, next) => {
  const { _id: owner } = req.user;
  const data = req.file
    ? { photo: req.file.path, owner, ...req.body }
    : { owner, ...req.body };

  try {
    const { error } = addCarSchema.validate(req.body);
    if (error) {
      throw HttpError(404, "missing required name field");
    }
    const result = await Car.create(data);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
};

const changeCar = async (req, res, next) => {
  const { carId } = req.params;
  const data = req.file
    ? { photo: req.file.path, ...req.body }
    : { ...req.body };

  try {
    const { error } = addCarSchema.validate(req.body);

    if (error) {
      throw HttpError(404, "missing required name field");
    }

    const result = await Car.findByIdAndUpdate(
      carId,
      { ...data },
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
