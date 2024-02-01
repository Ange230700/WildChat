const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      throw new Error("Password is undefined");
    }

    const hashedPassword = await argon2.hash(password);

    req.body.hashed_password = hashedPassword;

    delete req.body.password;

    next();
  } catch (err) {
    next(err);
  }
};

const verifyToken = (req, res, next) => {
  try {
    // check Authorization header
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      res.status(401).send({ error: "No token provided" });
    }

    // check if token is valid
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      res.status(401).send({ error: "Invalid token type" });
    }

    // check if token is valid (its expiration date and its authenticity)
    // if token is valid, the payload is returned and decoded
    req.auth = jwt.verify(token, process.env.APP_SECRET);

    next();
  } catch (err) {
    console.error(err.message);
    if (err.message === "jwt expired") {
      res.status(401).send({ error: "Token expired" });
    }
  }
};

module.exports = {
  hashPassword,
  verifyToken,
};
