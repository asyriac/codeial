const express = require("express");
const router = express.Router();
const index_controller = require("../controllers/index");
const passport = require("passport");
const postRoute = require("./posts");

router.get("/profile", passport.checkAuthentication, index_controller.profile_get);
router.get("/profile/:id", passport.checkAuthentication, index_controller.user_profile_get);
router.post("/update-profile", passport.checkAuthentication, index_controller.update_profile);
router.get("/feed", passport.checkAuthentication, index_controller.feed_get);
router.get("/sign-up", index_controller.signup_get);
router.post("/sign-up", index_controller.signup_post);
router.get("/sign-in", index_controller.signin_get);
// Use passport as middleware
router.post("/sign-in", passport.authenticate("local", { failureRedirect: "/sign-in" }), index_controller.signin_post);
router.get("/sign-out", index_controller.signout);
router.use("/posts/", postRoute);
router.use("/users", passport.checkAuthentication, index_controller.users_get);
module.exports = router;
