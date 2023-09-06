const { Schema } = require("mongoose");
const Joi = require("joi"); // для перевірки баді при запиті
require("dotenv").config();
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// схемы Joi для car
const addCarSchema = Joi.object({
  model: Joi.string().required(),
  type: Joi.string().required(),
  transmission: Joi.string().required(),
  mileage: Joi.number().required(),
  power: Joi.number().required(),
  tel: Joi.string().required(),
  year: Joi.number().required(),
  color: Joi.string().required(),
  fueltype: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().required(),
  price: Joi.number().required(),
  date: Joi.number(),
  description: Joi.any(),
});

// схема mongoose для cars
const carSchema = new Schema(
  {
    model: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    power: {
      type: Number,
      required: true,
    },
    tel: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fueltype: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    date: {
      type: Number,
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
    favorites: [String],
  },
  { versionKey: false, timestamps: true }
);

module.exports = {
  userSchema,
  registerSchema,
  loginSchema,
  carSchema,
  addCarSchema,
};
