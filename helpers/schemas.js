const { Schema } = require("mongoose");
const Joi = require("joi"); // для перевірки баді при запиті
require("dotenv").config();
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// схемы Joi для score
const addScoreSchema = Joi.object({
  score: Joi.number().required(),
  date: Joi.string().required(),
});

// схема mongoose для scores
const scoreSchema = new Schema(
  {
    score: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// схемы Joi для пользователей - проверка req.body
const registerSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

// схема mongoose для пользователей

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User's name is required"],
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Ema/* il is required"],
      unique: true,
    },

    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = {
  userSchema,
  registerSchema,
  loginSchema,
  scoreSchema,
  addScoreSchema,
};
