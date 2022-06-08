const { check, validationResult } = require("express-validator");
exports.validateUser = [
  [
    // check("fname")
    //   .trim()
    //   .not()
    //   .isEmpty()
    //   .withMessage("First Name is missing")
    //   .isLength({ min: 2, max: 8 })
    //   .withMessage("First Name must be 3-8 characters long!"),

    // check("lname")
    //   .trim()
    //   .not()
    //   .isEmpty()
    //   .withMessage("Last Name is missing")
    //   .isLength({ min: 3, max: 8 })
    //   .withMessage("Last Name must be 3-8 characters long!"),

    check("email")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Email is missing")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is invalid"),

    check("nic").contains("V").withMessage("Please check your NIC"),

    check("password")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Password is missing")
      .isLength({ min: 3, mix: 5 })
      .withMessage("Password must be 3-5 characters long!"),

    check("phone")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Phone is missing")
      .isNumeric()
      .withMessage("Please Check your phone number")
      .isLength({ mix: 10, min: 10 })
      .withMessage("Phone Number must be 10 Numbers!"),
  ],
];

exports.validate = (req, res, next) => {
  const error = validationResult(req).array();
  if (!error.length) return next();
  res.json({ success: false, message: error[0].msg });
};
