/* 
Success: 
Already handled by axios so I just pass data
{
  status: 200 / 201,
  data: { myData }
}

// Omitting status since react query makes it obvious?
ValidationError:
{
  statusCode: 400,
  error: 'Validation Error',
  message: 'Valiation not passed',
  errors: [
    {
      field: 'firstName',
      value: 'aojfoadbfodabf',
      message: 'not valid name'
    },
    {
      field: 'email',
      value: 'ram@gmail.com',
      message: 'email taken'
    }
  ]
}

Non validation error:
{
  statusCode: 400,
  error: 'Not Found Error',
  message: 'This route cannot be found',
  details: {path: 'badroute/route', }
}
*/

const { ValidationError } = require("../utils/error");
const { castErrorHandler, duplicateKeyErrorHandler, validationErrorHandler } = require("../utils/mongooseErrorHandlers");

const errorHandler = (err, req, res, next) => {
  // If the error does not have a statusCode, set it to 500 (Internal Server Error)

  // MAYBE HANDLE 500 STATUS CODE BETTER SINCE NEED FOR DEBUGGING

  // Handle Mongoose Cases
  if (err.name === 'CastError') {
    err = castErrorHandler(err)
  }
  if (err.code === 11000) err = duplicateKeyErrorHandler(err)
  if (err.name === 'ValidationError') err = validationErrorHandler(err)

  const statusCode = err.statusCode || 500;

  const errorResponse = {
    statusCode: statusCode,
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred',
    details: err.details || null,
  };

  if (err instanceof ValidationError) {
    errorResponse.errors = err.details.errors;
    delete errorResponse.details;
  }

  

  res.status(statusCode).send(errorResponse);

};


//Maybe add some Error extends class so that we can have custom message and error code

module.exports = errorHandler