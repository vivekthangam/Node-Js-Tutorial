const express = require("express");
const router = express.Router();
const {
    getUser,
    getUsers,
    updateUser,
    DeleteUser,
    createUser,
    UploadPhotoForUser,
    login,
    getMe
} = require("../controllers/user.controller");

const { protect } = require("../middeware/auth");
router.route("/").get(getUsers).post(createUser);
router.route("/me").get(protect, getMe);
router.route("/:id").get(getUser).put(updateUser).delete(DeleteUser);
router.route("/:userid/photo").put(UploadPhotoForUser);
router.route("/login").post(login);
module.exports = router;