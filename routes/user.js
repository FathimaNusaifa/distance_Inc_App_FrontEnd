const router = require("express").Router();
const { createUser, signin } = require("../controller/user");
const { validate, validateUser } = require("../middleware/validator");

router.post("/create", validateUser, validate, createUser);
router.post("/signin", signin);

module.exports = router;
