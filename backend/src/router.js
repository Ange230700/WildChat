const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import Controllers module for handling entity-related operations
const userControllers = require("./controllers/userControllers");

// Route to get a list of items
router.get("/users", userControllers.browse);

// Route to get a specific item by ID
router.get("/user/:id", userControllers.read);

// Route to add a new item
router.post("/user", userControllers.add);

/* ************************************************************************* */

module.exports = router;
