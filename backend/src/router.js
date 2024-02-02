const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { hashPassword, verifyToken } = require("./services/auth");

// Import Controllers module for handling entity-related operations
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

// Route to get a list of items

// § userControllers
router.get("/users", userControllers.browse);

// Route to get a specific item by ID

// § userControllers
router.get("/user/:id", userControllers.read);
router.get("/user", verifyToken, userControllers.readToken);

// Route to add a new item

// § userControllers
router.post("/user", hashPassword, userControllers.add);

// § authControllers
router.post("/login", authControllers.login);

// Route to update an existing item

// § userControllers
router.put("/user/:id", userControllers.edit);

// Route to delete an existing item

// § userControllers
router.delete("/user/:id", userControllers.destroy);

/* ************************************************************************* */

module.exports = router;
