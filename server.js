const express = require("express");
const app = express();

const dbConfig = require("./db");
const roomRoute = require("./routes/roomRoute");
const usersRoute = require("./routes/usersRoute");


// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Body parsing middleware
app.use(express.json()); // Middleware for parsing JSON request bodies

// Root URL handler
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/api/rooms", roomRoute);
app.use("/api/users", usersRoute);


const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node server started with nodemon"));
