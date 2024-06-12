const { ValidationError } = require("../utils/error");
const {
  castErrorHandler,
  duplicateKeyErrorHandler,
  validationErrorHandler,
} = require("../utils/mongooseErrorHandlers");

const sendErrorDev = (err, req, res) => {
  const errorResponse = {
    statusCode: err.statusCode,
    error: err.name || "Internal Server Error",
    message: err.message || "An unexpected error occurred",
    stack: err.stack, // Can include if want
    details: err.details || {},
  };

  if (err.errors) {
    errorResponse.errors = err.errors || [];
  }

  console.log(errorResponse, "MIDDLEWARE DEV");

  return res.status(err.statusCode).json(errorResponse);
};

const sendErrorProd = (err, req, res) => {
  if (err.isOperational) {
    // Operational, trusted error: send message to client
    res.status(err.statusCode).json({
      statusCode: err.statusCode,
      error: err.name || "Internal Server Error",
      message: err.message || "An unexpected error occurred",
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR 💥:", err); //Winston or sentry here

    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // Handle Mongoose Cases, Add more and seperate into function
  if (err.name === "CastError") err = castErrorHandler(err);
  if (err.code === 11000) err = duplicateKeyErrorHandler(err);
  if (err.name === "ValidationError") err = validationErrorHandler(err);
  // The Mongoose Validation Error will be thrown as a express validation error for consistency
  if (err.name === "ValidationErrorExpress") {
    err.errors = err.details?.errors || [];
    delete err.details;
  }

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    sendErrorProd(err, req, res);
  } else {
    res.status(err.statusCode).json({
      error: err.name || "Error",
      message: err.message || "An unexpected error occurred",
    });
  }
};

module.exports = errorHandler;
