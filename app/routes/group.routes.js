const express = require("express");
const router = express.Router();
const {
    getgroup,
    getgroups,
    updategroup,
    Deletegroup,
    creategroup,
} = require("../controllers/group.controller");

router.route("/").get(getgroups).post(creategroup);

router.route("/:id").get(getgroup).put(updategroup).delete(Deletegroup);

module.exports = router;