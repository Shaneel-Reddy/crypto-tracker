const express = require("express");
const validate = require("../middlewares/validate.middleware");
const cryptoValidation = require("../validations/crypto.validation");
const cryptoController = require("../controllers/crypto.controller");
const limiter = require("../middlewares/rateLimiter.middleware");

const router = express.Router();

router
  .route("/stats")
  .get(limiter, validate(cryptoValidation.getStats), cryptoController.getStats);

router
  .route("/deviation")
  .get(
    limiter,
    validate(cryptoValidation.getDeviation),
    cryptoController.getDeviation
  );

module.exports = router;
