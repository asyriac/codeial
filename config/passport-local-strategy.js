const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
// Authentication using passport
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    function(req, username, password, done) {
      // Find user and establish identity
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          console.log("err");
          return done(err);
        }
        if (!user || user.password != password) {
          // console.log("Invalid username/password");
          req.flash("error", "Invalid username/password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// Serialize - set user's id into the cookie in an encrypted form
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Deserialize - find the user based on the user id from cookie
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err) {
      console.log("err");
      return done(err);
    }
    return done(null, user);
  });
});

// Check if user is authenticated
passport.checkAuthentication = function(req, res, next) {
  // If the user is signed in, pass on request to next middleware
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed in
  else {
    return res.redirect("/sign-in");
  }
};

passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user contains the current signed in user from the session cookie and we are sending this to locals to make use of in the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
