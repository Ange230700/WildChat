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
      res.sendStatus(401).json({ error: "Unauthorized" });
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
  const user = req.body;

  try {
    // Update the user in the database
    const affectedRows = await tables.User.update(user);

    if (affectedRows === 0) {
      res.sendStatus(404);
    }

    // Respond with HTTP 200 (OK) and the number of affected rows
    res.status(200).json({ affectedRows });
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the user data from the request body
  const user = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.User.create(user);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
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
