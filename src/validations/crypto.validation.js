const Joi = require("joi");
const { coinGecko } = require("../config/config");

const getStats = {
  query: Joi.object().keys({
    coin: Joi.string()
      .valid(...coinGecko.supportedCoins)
      .required(),
  }),
};

const getDeviation = {
  query: Joi.object().keys({
    coin: Joi.string()
      .valid(...coinGecko.supportedCoins)
      .required(),
  }),
};

module.exports = {
  getStats,
  getDeviation,
};
