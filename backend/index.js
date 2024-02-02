// Load environment variables from .env file
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

// Import the Express application from src/app.js
const app = require("./src/app");

// * Create a new HTTP server
const server = http.createServer(app);

// * Create a new instance of the Socket.IO server
const io = new Server(server, {
  cors: {
    origin: [
      process.env.FRONTEND_URL, // keep this one, after checking the value in `backend/.env`
      "http://192.168.0.19:3000",
      "http://172.16.95.26:3000",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST"],
  },
});

// * Listen for incoming connections on the server
io.on("connection", (socket) => {
  console.warn("a user connected");

  socket.on("disconnect", () => {
    console.warn("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.warn("message: ", msg);
    io.emit("chat message", msg);
  });
});

// Get the port from the environment variables
const port = process.env.APP_PORT;

// Start the server and listen on the specified port
server
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
