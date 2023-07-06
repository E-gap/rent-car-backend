const { userRegister, userLogin, userCurrent, userLogout } = require("./users");

const { getAllScores, addScore, getUserScores } = require("./scores");

module.exports = {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  getAllScores,
  addScore,
  getUserScores,
};
