const { BadRequestError, ValidationError } = require("./error");

const castErrorHandler = (err) => {
  const message = `Invalid type: User gave ${err.valueType} but needed ${err.kind}`
  return new BadRequestError(message)
}

const duplicateKeyErrorHandler = (err) => {
  const message = `Duplicate key error: ${Object.keys(err.keyValue).join(", ")} already exists.`;
  return new BadRequestError(message)
  // return new BadRequestError('DUP ERROR')
}

const validationErrorHandler = (err) => {
  console.log(err);
  const errors = Object.values(err.errors).map(e => ({
    field: e.path,
    type: 'field',
    msg: e.message,
  }));
  return new ValidationError('Validation failed', errors);
}

module.exports = {castErrorHandler, duplicateKeyErrorHandler, validationErrorHandler}