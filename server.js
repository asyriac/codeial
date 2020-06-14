const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const customMware = require("./config/flashmiddleware");
const port = 8000;
const multer = require("multer");

const app = express();

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./images");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.urlencoded({ extended: true }));
app.use(
  multer({
    storage: fileStorage
  }).single("image")
);
app.use(cookieParser());

app.use(express.static("./assets"));
app.use("/images", express.static("./images"));
app.use(expressLayouts);
app.use(
  session({
    name: "codeal",
    secret: "randomtext",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled"
      },
      function(err) {
        console.log(err || "Connect-mongo setup ok");
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);
app.use("/", require("./routes"));

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else console.log(`Server started on port ${port}`);
});
