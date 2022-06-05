const User = require("../model/user");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { fname, lname, email, password, phone, nic } = req.body;

  const user = await User.findOne({ email });
  if (user) return sendError(res, "This email is already exists");

  const newUser = new User({
    fname,
    lname,
    email,
    password,
    phone,
    nic,
  });
  res.send(newUser);
  await newUser.save();
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email.trim() || !password.trim())
    return sendError(res, "Email/Password Missing");

  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!");

  const isMatched = await user.comparePassword(password);
  if (!isMatched) return sendError(res, "Email/passoword not match");

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    success: true,
    user: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      nic: user.nic,
      id: user._id,
      token: token,
    },
  });
};

exports.getuserbyemail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found!");
  res.json({
    success: true,
    user: {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      phone: user.phone,
      nic: user.nic,
      id: user._id,
    },
  });
};
