const User = require("../models/user");

module.exports.signup_get = function(req, res) {
  res.render("index", {
    title: "Sign Up"
  });
};

module.exports.signup_post = function(req, res) {
  if (req.body.password != req.body.confirm_password) {
    console.log("Password do not match");
    return res.redirect("back");
  }
  User.findOne(
    {
      email: req.body.email
    },
    function(err, user) {
      if (err) {
        console.log("Error in finding the user in the db");
        return;
      }
      if (!user) {
        User.create(req.body, function(err, user) {
          if (err) {
            console.log("Error creating the user");
            return;
          }
          res.redirect("/sign-in");
        });
      } else {
        res.redrirect("back");
      }
    }
  );
};

module.exports.signin_get = function(req, res) {
  res.render("signin", {
    title: "Sign In"
  });
};
