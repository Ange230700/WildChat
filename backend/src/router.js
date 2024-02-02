const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

const { hashPassword, verifyToken } = require("./services/auth");

// Import Controllers module for handling entity-related operations
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const messageControllers = require("./controllers/messageControllers");
const chatSessionControllers = require("./controllers/chatSessionControllers");

// Route to get a list of items

// § userControllers
router.get("/users", userControllers.browse);

// * messageControllers
router.get("/messages", messageControllers.browse);

// % chatSessionControllers
router.get("/chatSessions", chatSessionControllers.browse);

// Route to get a specific item by ID

// § userControllers
router.get("/user/:id", userControllers.read);
router.get("/user", verifyToken, userControllers.readToken);

// * messageControllers
router.get("/message/:id", messageControllers.read);

// % chatSessionControllers
router.get("/chatSession/:id", chatSessionControllers.read);

// Route to add a new item

// § userControllers
router.post("/user", hashPassword, userControllers.add);
// § authControllers
router.post("/login", authControllers.login);

// * messageControllers
router.post("/message", messageControllers.add);

// % chatSessionControllers
router.post("/chatSession", chatSessionControllers.add);

// Route to update an existing item

// § userControllers
router.put("/user/:id", userControllers.edit);

// * messageControllers
router.put("/message/:id", messageControllers.edit);

// % chatSessionControllers
router.put("/chatSession/:id", chatSessionControllers.edit);

// Route to delete an existing item

// § userControllers
router.delete("/user/:id", userControllers.destroy);

// * messageControllers
router.delete("/message/:id", messageControllers.destroy);

// % chatSessionControllers
router.delete("/chatSession/:id", chatSessionControllers.destroy);

/* ************************************************************************* */

module.exports = router;
