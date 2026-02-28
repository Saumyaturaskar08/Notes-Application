const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

// REGISTER
let register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.json({ msg: "User already exists" });
    }

    let hash = await bcrypt.hash(password, 10);

    let newUser = new User({
      name,
      email,
      password: hash,
    });

    await newUser.save();

    res.json({ msg: "User registered" });

  } catch (err) {
    res.json({ msg: "Register error" });
  }
};

// LOGIN
let login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.json({ msg: "User not found" });
    }

    let match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ msg: "Wrong password" });
    }

    let token = jwt.sign(
      { id: user._id },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      msg: "Login success",
      token,
      user,
    });

  } catch (err) {
    res.json({ msg: "Login error" });
  }
};

module.exports = { register, login };