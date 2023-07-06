const { model } = require("mongoose");
const { scoreSchema } = require("../helpers");

const Score = model("score", scoreSchema);

module.exports = Score;
