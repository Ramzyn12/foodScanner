const { BadRequestError, ValidationError } = require("./error");


/*
Another mongoose error to handle
{
  statusCode: 500,
  error: 'StrictPopulateError',
  message: 'Cannot populate path `consumedFoodss` because it is not in your schema. Set the `strictPopulate` option to false to override.',
  details: null
}
*/

const castErrorHandler = (err) => {
  // NEED TO IMPROVE THIS MESSAGE IT SOMETIMES doesnt make sense...
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new BadRequestError(message)
}

const duplicateKeyErrorHandler = (err) => {
  const message = `Duplicate key error: ${Object.keys(err.keyValue).join(", ")} already exists.`;
  return new BadRequestError(message)
}

const validationErrorHandler = (err) => {
  const errors = Object.values(err.errors).map(e => ({
    field: e.path,
    type: 'field',
    msg: e.message,
  }));
  return new ValidationError('Mongoose validation failed', errors);
}

module.exports = {castErrorHandler, duplicateKeyErrorHandler, validationErrorHandler}