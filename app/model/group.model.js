const mongoose = require("mongoose");

const group = mongoose.model(
    "group",
    new mongoose.Schema({
        grpName: String,
        grpDesc: String
    })
);

module.exports = group;