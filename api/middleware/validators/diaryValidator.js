const { body } = require("express-validator");

const addFoodValidator = [
  body('name').notEmpty().withMessage('Need a name!')
];


module.exports = { addFoodValidator };
