const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await tables.User.readAll();

    // Respond with the users in JSON format
    res.json(users);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific user from the database based on the provided ID
    const user = await tables.User.read(req.params.id);
    res.json(user);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    if (err.message === `User with ID ${req.params.id} not found`) {
      res.sendStatus(404);
    } else {
      next(err);
    }
  }
};

const readToken = async (req, res, next) => {
  const userInformation = req.auth;
  try {
    if (!userInformation || !userInformation.sub) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const user = await tables.User.read(userInformation.sub);

    if (!user) {
      res.sendStatus(404);
    }

    const { hashed_password, ...userWithoutPassword } = user;

    res.json(userWithoutPassword);
  } catch (err) {
    res.sendStatus(500);
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  // Extract the user data from the request body
  const { id } = req.params;
  const { username, email, current_password, new_password } = req.body;

  try {
    const currentUser = await tables.User.read(id);

    if (!currentUser) {
      res.status(404).json({ error: "User not found" });
    }

    if (
      !currentUser.hashed_password ||
      typeof currentUser.hashed_password !== "string" ||
      currentUser.hashed_password.trim() === ""
    ) {
      return res
        .status(500)
        .json({ error: "Current user password is not set properly" });
    }

    //  Verify old password before updating
    if (current_password && new_password) {
      const verified = await argon2.verify(
        currentUser.hashed_password,
        current_password
      );

      if (!verified) {
        return res
          .status(400)
          .json({ error: "Current user password is not set properly" });
      }

      if (new_password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters" });
      }

      req.body.hashed_password = await argon2.hash(new_password);
    }

    // Update the user in the database
    const updatedUser = await tables.User.update(id, {
      username,
      email,
      hashed_password: req.body.hashed_password,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with HTTP 200 (OK) and the number of affected rows
    const { hashed_password, ...userWithoutPassword } = updatedUser;
    res.status(200).json(userWithoutPassword);
  } catch (err) {
    next(err);
  }

  return null;
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    // Extract the user data from the request body
    const user = req.body;

    // check if user exists
    const existingUser = await tables.User.readByEmail(user.email);

    if (existingUser) {
      res.status(422).send({ error: "Email already exists" });
      return;
    }

    if (!user.hashed_password) {
      res.status(422).send({ error: "Password is required" });
      return;
    }

    // Insert the user into the database
    const insertId = await tables.User.create(user);

    if (insertId) {
      const newUser = await tables.User.read(insertId);
      const token = jwt.sign({ sub: newUser.id }, process.env.APP_SECRET, {
        expiresIn: "30m",
      });

      res.status(201).send({
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        message: "User created successfully",
      });
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    // Delete the user from the database
    const affectedRows = await tables.User.delete(req.params.id);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    // Respond with HTTP 200 (OK) and the number of affected rows
    res.status(204).json({ affectedRows });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  readToken,
  edit,
  add,
  destroy,
};
