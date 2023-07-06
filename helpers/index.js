const HttpError = require("./HttpError");

const {
  addContactsSchema,
  patchContactsFavoriteSchema,
  contactSchema,
  scoreSchema,
  userSchema,
  emailSchema,
  registerSchema,
  loginSchema,
  addScoreSchema,
} = require("./schemas");

module.exports = {
  HttpError,
  addContactsSchema,
  patchContactsFavoriteSchema,
  scoreSchema,
  addScoreSchema,
  contactSchema,
  userSchema,
  emailSchema,
  registerSchema,
  loginSchema,
};
