const { Schema } = require("mongoose");
const Joi = require("joi"); // для перевірки баді при запиті
require("dotenv").config();
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// схемы Joi для car
/* const addCarSchema = Joi.object({
  mark: Joi.string().required(),
  model: Joi.string().required(),
  type: Joi.string().required(),
  transmission: Joi.string().required(),
  mileage: Joi.number().required(),
  engine: Joi.number().required(),
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
}); */

const addCarSchema = Joi.object({
  mark: Joi.string(),
  model: Joi.string(),
  type: Joi.string(),
  transmission: Joi.string(),
  mileage: Joi.number(),
  engine: Joi.number(),
  photo: Joi.string(),
  power: Joi.number(),
  tel: Joi.string(),
  year: Joi.number(),
  color: Joi.string(),
  fueltype: Joi.string(),
  city: Joi.string(),
  email: Joi.string(),
  price: Joi.number(),
  date: Joi.number(),
  description: Joi.any(),
});

// схема mongoose для cars
/* const carSchema = new Schema(
  {
    mark: {
      type: String,
      required: true,
    },
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
    engine: {
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
); */

const carSchema = new Schema(
  {
    mark: {
      type: String,
      required: false,
    },
    model: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: false,
    },
    transmission: {
      type: String,
      required: false,
    },
    mileage: {
      type: Number,
      required: false,
    },
    engine: {
      type: Number,
      required: false,
    },
    power: {
      type: Number,
      required: false,
    },
    tel: {
      type: String,
      required: false,
    },
    year: {
      type: Number,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    fueltype: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    description: String,
    date: {
      type: Number,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    photo: {
      type: String,
      required: false,
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

const updateUserSchema = Joi.object({
  name: Joi.string().required(),
  /* password: Joi.string().min(6).required(), */
  email: Joi.string().pattern(emailRegexp).required(),
  city: Joi.string(),
  tel: Joi.string(),
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
    city: String,
    tel: String,
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
  updateUserSchema,
};
