const errorHandler = (err, req, res, next) => {
  // If the error does not have a statusCode, set it to 500 (Internal Server Error)
  const statusCode = err.statusCode || 500;

  console.error(err.stack); // Log the error stack for debugging purposes

  // Send the response with the status code and the error message
  res.status(statusCode).send({
      message: err.message || 'An unexpected error occurred'
  });
};


//Maybe add some Error extends class so that we can have custom message and error code

module.exports = errorHandler