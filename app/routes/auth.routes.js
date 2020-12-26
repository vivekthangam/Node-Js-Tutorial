const express = require("express");
const router = express.Router();
const {
    forgetPassword,
    resetPassword,
    logout
} = require("../middeware/auth");


router.route("/logout").get(logout);
router.route("/forgetpassword").get(forgetPassword);
router.route("/resetPassword/:resttoken").get(resetPassword);
module.exports = router;