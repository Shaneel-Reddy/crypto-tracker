const Joi = require("joi");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const validate = (schema) => (req, res, next) => {
  const validSchema = schema;
  const validFields = ["params", "query", "body"];
  const object = {};

  validFields.forEach((field) => {
    if (validSchema[field]) {
      object[field] = req[field];
    }
  });

  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: "key" }, abortEarly: false })
    .validate(object);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  Object.assign(req, value);
  return next();
};

module.exports = validate;
