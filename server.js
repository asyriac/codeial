const express = require("express");
const mainRoute = require("./routes/index");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const port = 8000;

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static("./assets"));
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", mainRoute);

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else console.log(`Server started on port ${port}`);
});
