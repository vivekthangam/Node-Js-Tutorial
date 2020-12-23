const express = require("express");
const router = express.Router();
const {
    getUser,
    getUsers,
    updateUser,
    DeleteUser,
    createUser,
    UploadPhotoForUser
} = require("../controllers/user.controller");

router.route("/").get(getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(DeleteUser);
router.route("/:userid/photo").put(UploadPhotoForUser);
module.exports = router;