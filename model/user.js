const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    default: "",
  },
  lname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  nic: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "",
  },
  avtar: {
    type: String,
    default: "",
  },
  active: {
    type: Number,
    default: 1,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 8);
    this.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password);
  return result;
};
module.exports = mongoose.model("User", userSchema);
