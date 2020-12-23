const express = require("express");
const router = express.Router();
const {
  getroom,
  getrooms,
  updateroom,
  Deleteroom,
  createroom,
} = require("../controllers/room.controller");

router.route("/").get(getrooms).post(createroom);

router.route("/:id").get(getroom).put(updateroom).delete(Deleteroom);
  
module.exports = router;
