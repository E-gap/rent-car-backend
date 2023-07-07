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
});

// схема mongoose для cars
const carSchema = new Schema(
  {
    model: {
      type: Number,
      required: true,
    },
    type: {
      type: Number,
      required: true,
    },
    transmission: {
      type: Number,
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
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: Number,
      required: true,
    },
    fueltype: {
      type: Number,
      required: true,
    },
    city: {
      type: Number,
      required: true,
    },
    email: {
      type: Number,
      required: true,
    },
    price: {
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
  carSchema,
  addCarSchema,
};
