const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const User = require("../models/user");

const { HttpError, registerSchema, loginSchema } = require("../helpers");

const userRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // проверяем бади по схеме joi
    const { error } = registerSchema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        "Error validation: email or password is not correct"
      );
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, {
      expiresIn: "23h",
    });

    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
        token,
        userId: newUser._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw HttpError(
        400,
        "Error validation: email or password is not correct"
      );
    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordRight = await bcrypt.compare(password, userExist.password);
    if (!isPasswordRight) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = jwt.sign({ id: userExist._id }, SECRET_KEY, {
      expiresIn: "23h",
    });
    await User.findByIdAndUpdate(userExist._id, { token });

    res.json({
      token,
      favorites: userExist.favorites,
      user: {
        email: userExist.email,
        name: userExist.name,
        token,
        userId: userExist._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

const userCurrent = (req, res, next) => {
  const { email, name, favorites, _id } = req.user;

  res.status(200).json({
    user: { email, name },
    favorites,
    userId: _id,
  });
};

const userLogout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

const userChangeFavorite = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { carId } = req.body;

    const existUser = await User.findById(_id);

    const isCarFavorite = existUser.favorites.find((item) => item === carId);

    let newFavorites = [];

    if (!isCarFavorite) {
      newFavorites = [...existUser.favorites, carId];
    } else {
      newFavorites = existUser.favorites.filter((item) => item !== carId);
    }

    await User.findByIdAndUpdate(_id, { favorites: newFavorites });

    res.status(201).json({
      favorites: newFavorites,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  userCurrent,
  userLogout,
  userChangeFavorite,
};
