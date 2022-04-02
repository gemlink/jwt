const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.refreshToken || req.query.refreshToken || req.headers["x-refresh-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.REFRESH_TOKEN_KEY);
    req.user = decoded;

    if (req.body.email != req.user.email) {
      res.status(401).send("Email is incorrect");
    }

    if(req.user.exp < Math.round(new Date().getTime() / 1000)) {
      res.status(401).send("Token was expired");
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
