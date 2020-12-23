const express = require("express");
const router = express.Router();
const {
  getmessage,
  getmessages,
  updatemessage,
  Deletemessage,
  createmessage,
} = require("../controllers/message.controller");

router.route("/").get(getmessages).post(createmessage);

router.route("/:id").get(getmessage).put(updatemessage).delete(Deletemessage);
  
module.exports = router;
