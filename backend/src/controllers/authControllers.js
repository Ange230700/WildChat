const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // check if username exists
    const user = await tables.User.readByUsername(username);

    if (!user) {
      res.status(401).send({ error: "Invalid username or password" });
    }

    // check if password is correct
    const passwordMatches = await argon2.verify(user.hashed_password, password);

    if (!passwordMatches) {
      res.status(401).send({ error: "Invalid username or password" });
    }

    // generate token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        online_status: user.online_status,
      },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // send token to client
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
