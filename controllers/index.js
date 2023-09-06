const {
  userRegister,
  userUpdate,
  userLogin,
  userCurrent,
  userLogout,
  userChangeFavorite,
} = require("./users");

const {
  getAllCars,
  addCar,
  getUserCars,
  getFavoriteCars,
  deleteCar,
  getOneCar,
  changeCar,
} = require("./cars");

module.exports = {
  userRegister,
  userUpdate,
  userLogin,
  userCurrent,
  userLogout,
  userChangeFavorite,
  getAllCars,
  addCar,
  getUserCars,
  getFavoriteCars,
  deleteCar,
  getOneCar,
  changeCar,
};
