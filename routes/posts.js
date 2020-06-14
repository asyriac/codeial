const express = require("express");
const router = express.Router();
const passport = require("passport");
const postController = require("../controllers/posts");

router.post("/create", passport.checkAuthentication, postController.create_post);
router.get("/:id", postController.show_post);
router.post("/add-comment", postController.comment_post);
router.get("/delete-post/:id", passport.checkAuthentication, postController.delete_post);
router.get("/delete-comment/:id", passport.checkAuthentication, postController.delete_comment);
module.exports = router;
