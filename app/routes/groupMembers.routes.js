const express = require("express");
const router = express.Router();
const {
    getgroupMember,
    getgroupMembers,
    updategroupMember,
    DeletegroupMember,
    creategroupMember,
} = require("../controllers/groupMember.controller");

router.route("/").get(getgroupMembers).post(creategroupMember);

router.route("/:id").get(getgroupMember).put(updategroupMember).delete(DeletegroupMember);

module.exports = router;