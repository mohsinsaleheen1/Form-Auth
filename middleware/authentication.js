const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authorization = async (req, res, next) => {
  const header = req.header("Authorization");
  if (!header) {
    return res.send({
      status: 401,
      message: "headers are invalid",
    });
  }
  try {
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.send({
      status: 505,
      message: "user is not authorized",
    });
  }
};
module.exports = authorization;
