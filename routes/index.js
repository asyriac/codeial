const express = require("express");
const router = express.Router();
const index_controller = require("../controllers/index");

router.get("/sign-up", index_controller.signup_get);
router.post("/sign-up", index_controller.signup_post);
router.get("/sign-in", index_controller.signin_get);

module.exports = router;
