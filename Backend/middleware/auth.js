const jwt = require("jsonwebtoken");

const SECRET = "mysecretkey";

const auth = (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.json({ msg: "No token" });
    }

    const data = jwt.verify(token, SECRET);

    req.userId = data.id;

    next();

  } catch (err) {
    res.json({ msg: "Invalid token" });
  }

};

module.exports = auth;