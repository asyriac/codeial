const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codeal", { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
const db = mongoose.connection;

db.on("error", function() {
  console.log("Error connecting to DB");
});

db.once("open", function() {
  console.log("Connected to DB");
});

module.exports = db;
