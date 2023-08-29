const {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userChangeFavorite,
} = require("./users");

const { getAllCars, addCar, getUserCars } = require("./cars");

module.exports = {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userChangeFavorite,
  getAllCars,
  addCar,
  getUserCars,
};
