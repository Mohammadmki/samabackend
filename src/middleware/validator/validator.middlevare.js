
const { validationResult } = require("express-validator");


const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    const errorObj = {};
    errors.array().forEach(err => {
      errorObj[err.path] = err.msg;
    });
    return res.status(400).json({ errors: errorObj });
  }
  next();
};

module.exports = { handleValidationErrors };