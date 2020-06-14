const User = require("../models/user");
const Post = require("../models/posts");
const defaultImageUrl = "images\\1584199464390-Capture.JPG";

module.exports.signup_get = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("index", {
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
        User.create(
          {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            imageUrl: defaultImageUrl
          },
          function(err, user) {
            if (err) {
              console.log("Error creating the user");
              return;
            }
            res.redirect("/sign-in");
          }
        );
      } else {
        res.redirect("back");
      }
    }
  );
};

module.exports.signin_get = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  return res.render("signin", {
    title: "Sign In"
  });
};

module.exports.feed_get = function(req, res) {
  Post.find({}, function(err, posts) {
    return res.render("feed", {
      title: "Feed",
      posts: posts
    });
  });
};

module.exports.signin_post = function(req, res) {
  req.flash("success", "Logged in successfully");
  return res.redirect("/profile");
};

module.exports.signout = function(req, res) {
  req.logout();
  req.flash("success", "Logged out successfully");
  return res.redirect("/sign-in");
};

module.exports.profile_get = function(req, res) {
  return res.render("profile", {
    title: "Profile"
  });
};

module.exports.users_get = function(req, res) {
  User.find({}, function(err, users) {
    return res.render("users", {
      title: "Users",
      all_users: users
    });
  });
};

module.exports.user_profile_get = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    return res.render("user_page", {
      title: "User Details",
      user: user
    });
  });
};

module.exports.update_profile = function(req, res) {
  let updatedUrl = defaultImageUrl;
  if (req.file) {
    updatedUrl = req.file.path;
  }
  User.findByIdAndUpdate(
    req.user._id,
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      imageUrl: updatedUrl
    },
    function(err, user) {
      return res.redirect("back");
    }
  );
};
