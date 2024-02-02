const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../tables");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if username exists
    const user = await tables.User.readByEmail(email);

    if (!user) {
      res.status(422).send({ error: "Invalid email or password" });
      return;
    }

    if (user && user.hashed_password) {
      const verified = await argon2.verify(user.hashed_password, password);

      if (!verified) {
        res.status(422).send({ error: "Invalid email or password" });
        return;
      }

      const token = jwt.sign({ sub: user.id }, process.env.APP_SECRET, {
        expiresIn: "30m",
      });

      const { hashed_password, ...userWithoutPassword } = user;
      res.status(200).json({
        token,
        userWithoutPassword,
        message: "Logged in successfully",
      });
    } else {
      res.status(422).send({ error: "Invalid email or password" });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
