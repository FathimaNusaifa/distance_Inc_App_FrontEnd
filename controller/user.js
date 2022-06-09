const User = require("../model/user");
const { sendError } = require("../utils/helper");
const jwt = require("jsonwebtoken");

//Signup Code segment
exports.createUser = async (req, res) => {
  const { email, password, phone, nic } = req.body;

  const user = await User.findOne({ email });
  if (user) return res.send({ success: false, message: "Email already exist" });

  const newUser = new User({
    email,
    password,
    phone,
    nic,
  });
  // res.send(newUser);
  await newUser.save();
  return res.send({ success: true, message: "Signup successful!" });
};

//Signin Code segment
exports.signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.send({ success: false, message: "username/password is wrong!" });

  const isMatched = await user.comparePassword(password);

  console.log(isMatched);
  if (isMatched == false) {
    return res.send({ success: false, message: "username/password is wrong!" });
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.send({
    success: true,
    message: "Login Successful!",
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

//getting all users code segment
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

exports.getusers = async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
