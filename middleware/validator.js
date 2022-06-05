const { check, validationResult } = require("express-validator");
exports.validateUser = [
  [
    check("name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is missing")
      .isLength({ min: 3, min: 8 })
      .withMessage("Name must be 3-8 characters long!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Name is missing")
      .isLength({ min: 3, min: 5 })
      .withMessage("Password must be 3-5 characters long!"),
  ],
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();

  res.status(400).json({ success: false, error: error[0].msg });
};
