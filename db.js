const mongoose = require("mongoose");

var mongoURL =
  "mongodb+srv://pranab:Pranab1stdb@cluster0.uyn26vt.mongodb.net/to-let_agency";

mongoose.connect(mongoURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  connectTimeoutMS: 60000,
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("MongoDB Connection failed");
});

connection.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

module.exports = connection;

