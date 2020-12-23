const mongoose = require("mongoose");
const slugify = require("slugify");
const groupMemberSchema = new mongoose.Schema({
    group_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group"
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
});

groupMemberSchema.pre("save", function(next) {
    console.log("name", this.name);
    next();
});

module.exports = mongoose.model("groupMember", groupMemberSchema);